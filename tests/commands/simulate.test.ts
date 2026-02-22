import { simulateCommand } from '../../src/commands/simulate';

describe('simulateCommand', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should generate mock errors', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    simulateCommand();
    
    expect(consoleSpy).toHaveBeenCalled();
    // Check for the mini logo or mock generator text
    const hasOutput = consoleSpy.mock.calls.some(call => 
      typeof call[0] === 'string' && (call[0].includes('Mock') || call[0].includes('EDGE CLI'))
    );
    expect(hasOutput).toBe(true);
    
    consoleSpy.mockRestore();
  });

  it('should output various error types', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    simulateCommand();
    
    // Fast-forward timers to trigger all setTimeout calls
    jest.runAllTimers();
    
    const output = consoleSpy.mock.calls.map(call => call[0]).join('\n');
    
    expect(output).toContain('ERROR');
    expect(output).toContain('WARN');
    
    consoleSpy.mockRestore();
  });

  it('should include completion message', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    simulateCommand();
    jest.runAllTimers();
    
    expect(consoleSpy.mock.calls.some(call => 
      call[0].includes('complete')
    )).toBe(true);
    
    consoleSpy.mockRestore();
  });
});
