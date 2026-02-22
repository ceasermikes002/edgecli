import { statsCommand } from '../../src/commands/stats';
import { SessionStats } from '../../src/session-stats';

describe('statsCommand', () => {
  it('should call SessionStats printSummary', () => {
    const stats = SessionStats.getInstance();
    const printSpy = jest.spyOn(stats, 'printSummary').mockImplementation();
    
    statsCommand();
    
    expect(printSpy).toHaveBeenCalled();
    
    printSpy.mockRestore();
  });

  it('should not throw errors', () => {
    expect(() => statsCommand()).not.toThrow();
  });
});
