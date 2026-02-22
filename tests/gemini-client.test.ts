import { GeminiClient } from '../src/gemini-client';

// Mock the Google Generative AI SDK
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: () => JSON.stringify({
              severity: 'high',
              hypothesis: 'Database connection timeout',
              confidence: 0.85,
              needs_deeper: false
            }),
            usageMetadata: {
              totalTokenCount: 150
            }
          }
        })
      })
    }))
  };
});

describe('GeminiClient', () => {
  let client: GeminiClient;
  const mockApiKey = 'test-api-key-12345';

  beforeEach(() => {
    client = new GeminiClient(mockApiKey);
  });

  describe('constructor', () => {
    it('should initialize with API key', () => {
      expect(client).toBeInstanceOf(GeminiClient);
    });
  });

  describe('lightTriage', () => {
    it('should perform light triage and return structured result', async () => {
      const logSummary = 'ERROR: Database connection failed';
      
      const { result, metrics } = await client.lightTriage(logSummary);
      
      expect(result).toHaveProperty('severity');
      expect(result).toHaveProperty('hypothesis');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('needs_deeper');
      expect(metrics).toHaveProperty('latency');
      expect(metrics).toHaveProperty('tokens');
      expect(metrics.tokens).toBeGreaterThan(0);
    });

    it('should record metrics', async () => {
      const logSummary = 'ERROR: Test error';
      
      await client.lightTriage(logSummary);
      
      const metrics = client.getMetrics();
      expect(metrics.length).toBeGreaterThan(0);
    });

    it('should handle confidence values correctly', async () => {
      const logSummary = 'ERROR: Complex multi-file issue';
      
      const { result } = await client.lightTriage(logSummary);
      
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });

  describe('deepAnalysis', () => {
    it('should perform deep analysis with root cause', async () => {
      // Mock deep analysis response
      const mockDeepResponse = {
        root_cause: 'Missing null check in authentication flow',
        patch_diff: '--- a/auth.js\n+++ b/auth.js\n@@ -10,6 +10,9 @@\n+  if (!token) return null;',
        affected_files: ['auth.js']
      };

      const mockModel = {
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: () => JSON.stringify(mockDeepResponse),
            usageMetadata: { totalTokenCount: 300 }
          }
        })
      };

      // Override the model for this test
      (client as any).model = mockModel;

      const logSummary = 'ERROR: Null pointer in auth';
      const { result, metrics } = await client.deepAnalysis(logSummary);
      
      expect(result).toHaveProperty('root_cause');
      expect(result).toHaveProperty('patch_diff');
      expect(result).toHaveProperty('affected_files');
      expect(metrics.latency).toBeGreaterThanOrEqual(0);
    });

    it('should accept optional file snippets', async () => {
      const mockModel = {
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: () => JSON.stringify({
              root_cause: 'Test cause',
              patch_diff: 'Test diff',
              affected_files: []
            }),
            usageMetadata: { totalTokenCount: 200 }
          }
        })
      };

      (client as any).model = mockModel;

      const logSummary = 'ERROR: Test';
      const fileSnippets = 'function test() { return null; }';
      
      await client.deepAnalysis(logSummary, fileSnippets);
      
      expect(mockModel.generateContent).toHaveBeenCalled();
    });
  });

  describe('getTotalStats', () => {
    it('should calculate total statistics', async () => {
      await client.lightTriage('ERROR: Test 1');
      await client.lightTriage('ERROR: Test 2');
      
      const stats = client.getTotalStats();
      
      expect(stats.totalCalls).toBe(2);
      expect(stats.avgLatency).toBeGreaterThanOrEqual(0);
      expect(stats.totalTokens).toBeGreaterThan(0);
      expect(stats.avgTokens).toBeGreaterThan(0);
    });

    it('should handle zero calls gracefully', () => {
      const stats = client.getTotalStats();
      
      expect(stats.totalCalls).toBe(0);
      expect(stats.avgLatency).toBe(0);
      expect(stats.avgTokens).toBe(0);
    });
  });

  describe('getMetrics', () => {
    it('should return array of metrics', async () => {
      await client.lightTriage('ERROR: Test');
      
      const metrics = client.getMetrics();
      
      expect(Array.isArray(metrics)).toBe(true);
      expect(metrics[0]).toHaveProperty('latency');
      expect(metrics[0]).toHaveProperty('tokens');
      expect(metrics[0]).toHaveProperty('timestamp');
    });
  });
});
