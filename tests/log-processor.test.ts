import { LogProcessor } from '../src/log-processor';

describe('LogProcessor', () => {
  let processor: LogProcessor;

  beforeEach(() => {
    processor = new LogProcessor();
  });

  describe('addLine', () => {
    it('should add lines to buffer', () => {
      processor.addLine('ERROR: test error');
      expect(processor.hasData()).toBe(true);
    });

    it('should handle empty lines', () => {
      processor.addLine('');
      expect(processor.hasData()).toBe(true);
    });
  });

  describe('shouldBatch', () => {
    it('should batch when size threshold is met', () => {
      for (let i = 0; i < 100; i++) {
        processor.addLine(`ERROR: test ${i}`);
      }
      expect(processor.shouldBatch()).toBe(true);
    });

    it('should not batch with few lines immediately', () => {
      processor.addLine('ERROR: test');
      expect(processor.shouldBatch()).toBe(false);
    });
  });

  describe('getBatch', () => {
    it('should return batched logs and clear buffer', () => {
      processor.addLine('ERROR: line 1');
      processor.addLine('ERROR: line 2');
      
      const batch = processor.getBatch();
      
      expect(batch).toContain('line 1');
      expect(batch).toContain('line 2');
      expect(processor.hasData()).toBe(false);
    });
  });

  describe('summarize', () => {
    it('should extract errors and warnings', () => {
      const logs = `
INFO: Starting application
ERROR: Database connection failed
WARN: Memory usage high
ERROR: Null pointer exception
INFO: Request completed
      `.trim();

      const summary = processor.summarize(logs);

      expect(summary).toContain('Errors: 2');
      expect(summary).toContain('Warnings: 1');
      expect(summary).toContain('Database connection failed');
    });

    it('should mask sensitive data', () => {
      const logs = `
ERROR: Failed to authenticate user@example.com
ERROR: Invalid API key: abc123def456ghi789jkl012mno345pqr678
ERROR: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 token expired
      `.trim();

      const summary = processor.summarize(logs);

      expect(summary).toContain('[EMAIL]');
      expect(summary).toContain('[API_KEY]');
      expect(summary).toContain('Bearer [TOKEN]');
      expect(summary).not.toContain('user@example.com');
    });

    it('should deduplicate similar errors', () => {
      const logs = `
ERROR: Connection timeout at line 42
ERROR: Connection timeout at line 43
ERROR: Connection timeout at line 44
ERROR: Connection timeout at line 45
      `.trim();

      const summary = processor.summarize(logs);

      // Should only show one instance of the repeated error
      const errorCount = (summary.match(/Connection timeout/g) || []).length;
      expect(errorCount).toBe(1);
    });

    it('should handle empty logs', () => {
      const summary = processor.summarize('');
      
      expect(summary).toContain('Total lines: 0');
      expect(summary).toContain('Errors: 0');
    });
  });

  describe('hasData', () => {
    it('should return false when buffer is empty', () => {
      expect(processor.hasData()).toBe(false);
    });

    it('should return true when buffer has data', () => {
      processor.addLine('test');
      expect(processor.hasData()).toBe(true);
    });
  });
});
