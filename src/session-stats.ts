import { UIComponents } from './ui/components';

export class SessionStats {
  private static instance: SessionStats;
  private startTime: number;
  private triageCounts: Record<string, number> = { low: 0, medium: 0, high: 0, critical: 0 };
  private deepAnalysisCount = 0;

  private constructor() {
    this.startTime = Date.now();
  }

  static getInstance(): SessionStats {
    if (!SessionStats.instance) {
      SessionStats.instance = new SessionStats();
    }
    return SessionStats.instance;
  }

  recordTriage(severity: string): void {
    this.triageCounts[severity] = (this.triageCounts[severity] || 0) + 1;
  }

  recordDeepAnalysis(): void {
    this.deepAnalysisCount++;
  }

  printSummary(): void {
    const duration = Math.floor((Date.now() - this.startTime) / 1000);
    const totalTriages = Object.values(this.triageCounts).reduce((a, b) => a + b, 0);
    const timeSaved = Math.floor(totalTriages * 45 / 60);

    UIComponents.showStats({
      duration,
      totalTriages,
      triageCounts: this.triageCounts,
      deepAnalysisCount: this.deepAnalysisCount,
      timeSaved,
    });
  }
}
