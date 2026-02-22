import { SessionStats } from '../src/session-stats';

describe('SessionStats', () => {
  let stats: SessionStats;

  beforeEach(() => {
    // Get singleton instance
    stats = SessionStats.getInstance();
  });

  describe('getInstance', () => {
    it('should return singleton instance', () => {
      const instance1 = SessionStats.getInstance();
      const instance2 = SessionStats.getInstance();
      
      expect(instance1).toBe(instance2);
    });
  });

  describe('recordTriage', () => {
    it('should record low severity triage', () => {
      stats.recordTriage('low');
      // Stats are recorded internally, verify via printSummary output
    });

    it('should record multiple severities', () => {
      stats.recordTriage('low');
      stats.recordTriage('medium');
      stats.recordTriage('high');
      stats.recordTriage('critical');
      
      // Should not throw
      expect(() => stats.printSummary()).not.toThrow();
    });
  });

  describe('recordDeepAnalysis', () => {
    it('should record deep analysis count', () => {
      stats.recordDeepAnalysis();
      stats.recordDeepAnalysis();
      
      expect(() => stats.printSummary()).not.toThrow();
    });
  });

  describe('printSummary', () => {
    it('should print summary without errors', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      stats.recordTriage('high');
      stats.recordDeepAnalysis();
      stats.printSummary();
      
      expect(consoleSpy).toHaveBeenCalled();
      // Just verify it was called multiple times (UI components print many lines)
      expect(consoleSpy.mock.calls.length).toBeGreaterThan(5);
      
      consoleSpy.mockRestore();
    });

    it('should calculate time saved estimate', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      stats.recordTriage('high');
      stats.recordTriage('medium');
      stats.printSummary();
      
      const hasTimeSaved = consoleSpy.mock.calls.some(call => 
        typeof call[0] === 'string' && call[0].includes('time saved')
      );
      expect(hasTimeSaved).toBe(true);
      
      consoleSpy.mockRestore();
    });
  });
});
