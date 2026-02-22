import { GoogleGenerativeAI } from '@google/generative-ai';

export interface TriageResult {
  severity: 'low' | 'medium' | 'high' | 'critical';
  hypothesis: string;
  confidence: number;
  needs_deeper: boolean;
}

export interface DeepAnalysisResult {
  root_cause: string;
  patch_diff: string;
  affected_files: string[];
}

export interface GeminiMetrics {
  latency: number;
  tokens: number;
  timestamp: number;
}

export class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private modelName: string;
  private metrics: GeminiMetrics[] = [];

  constructor(apiKey: string, modelName: string = 'gemini-2.0-flash-exp') {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = modelName;
    this.model = this.genAI.getGenerativeModel({ model: modelName });
  }

  async lightTriage(logSummary: string): Promise<{ result: TriageResult; metrics: GeminiMetrics }> {
    const startTime = Date.now();
    
    const prompt = `Analyze this log batch and classify the incident. Output ONLY valid JSON with no markdown formatting.

Log Summary:
${logSummary}

Respond with JSON in this exact format:
{
  "severity": "low|medium|high|critical",
  "hypothesis": "brief explanation of the issue",
  "confidence": 0.0-1.0,
  "needs_deeper": true|false
}`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const latency = Date.now() - startTime;
    const tokens = response.usageMetadata?.totalTokenCount || 0;
    
    const metrics: GeminiMetrics = { latency, tokens, timestamp: Date.now() };
    this.metrics.push(metrics);

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    
    return { result: parsed, metrics };
  }

  async deepAnalysis(logSummary: string, fileSnippets?: string): Promise<{ result: DeepAnalysisResult; metrics: GeminiMetrics }> {
    const startTime = Date.now();
    
    const prompt = `Perform deep root cause analysis on this incident. Output ONLY valid JSON with no markdown formatting.

Log Summary:
${logSummary}

${fileSnippets ? `Code Context:\n${fileSnippets}` : ''}

Respond with JSON in this exact format:
{
  "root_cause": "detailed explanation of the root cause",
  "patch_diff": "unified diff format patch suggestion",
  "affected_files": ["file1.js", "file2.js"]
}`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const latency = Date.now() - startTime;
    const tokens = response.usageMetadata?.totalTokenCount || 0;
    
    const metrics: GeminiMetrics = { latency, tokens, timestamp: Date.now() };
    this.metrics.push(metrics);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    
    return { result: parsed, metrics };
  }

  getMetrics(): GeminiMetrics[] {
    return this.metrics;
  }

  getTotalStats() {
    const total = this.metrics.length;
    const totalLatency = this.metrics.reduce((sum, m) => sum + m.latency, 0);
    const totalTokens = this.metrics.reduce((sum, m) => sum + m.tokens, 0);
    
    return {
      totalCalls: total,
      avgLatency: total > 0 ? totalLatency / total : 0,
      totalLatency,
      totalTokens,
      avgTokens: total > 0 ? totalTokens / total : 0
    };
  }
}
