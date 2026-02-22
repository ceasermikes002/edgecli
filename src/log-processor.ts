export class LogProcessor {
  private buffer: string[] = [];
  private readonly batchSize = 100;
  private readonly batchTimeMs = 3000;
  private lastBatchTime = Date.now();

  addLine(line: string): void {
    this.buffer.push(line);
  }

  shouldBatch(): boolean {
    const timePassed = Date.now() - this.lastBatchTime >= this.batchTimeMs;
    const sizeMet = this.buffer.length >= this.batchSize;
    return timePassed || sizeMet;
  }

  getBatch(): string {
    const batch = this.buffer.join('\n');
    this.buffer = [];
    this.lastBatchTime = Date.now();
    return batch;
  }

  summarize(logs: string): string {
    const lines = logs.split('\n').filter(l => l.trim());
    
    // Extract errors and warnings
    const errors = lines.filter(l => /error|exception|fail/i.test(l));
    const warnings = lines.filter(l => /warn|warning/i.test(l));
    
    // Deduplicate similar errors
    const uniqueErrors = this.deduplicateErrors(errors);
    
    // Mask sensitive data
    const masked = this.maskSensitiveData([...uniqueErrors, ...warnings].join('\n'));
    
    return `Total lines: ${lines.length}
Errors: ${errors.length}
Warnings: ${warnings.length}

Key Issues:
${masked}`;
  }

  private deduplicateErrors(errors: string[]): string[] {
    const seen = new Map<string, number>();
    const unique: string[] = [];
    
    for (const error of errors) {
      const normalized = error.replace(/\d+/g, 'N').substring(0, 100);
      const count = seen.get(normalized) || 0;
      
      if (count === 0) {
        unique.push(error);
      }
      seen.set(normalized, count + 1);
    }
    
    return unique.slice(0, 10); // Top 10 unique errors
  }

  private maskSensitiveData(text: string): string {
    return text
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]')
      .replace(/\b[A-Za-z0-9]{32,}\b/g, '[API_KEY]')
      .replace(/Bearer\s+[^\s]+/g, 'Bearer [TOKEN]');
  }

  hasData(): boolean {
    return this.buffer.length > 0;
  }
}
