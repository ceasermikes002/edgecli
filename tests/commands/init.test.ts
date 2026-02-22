import { initCommand } from '../../src/commands/init';

describe('initCommand', () => {
  it('should print setup instructions without errors', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    initCommand();
    
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.mock.calls.some(call => 
      call[0].includes('Setup')
    )).toBe(true);
    expect(consoleSpy.mock.calls.some(call => 
      call[0].includes('GEMINI_API_KEY')
    )).toBe(true);
    
    consoleSpy.mockRestore();
  });

  it('should include API key URL', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    initCommand();
    
    expect(consoleSpy.mock.calls.some(call => 
      call[0].includes('makersuite.google.com')
    )).toBe(true);
    
    consoleSpy.mockRestore();
  });

  it('should include platform-specific instructions', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    initCommand();
    
    const output = consoleSpy.mock.calls.map(call => call[0]).join('\n');
    
    expect(output).toContain('Linux/macOS');
    expect(output).toContain('Windows');
    expect(output).toContain('export');
    expect(output).toContain('$env:');
    
    consoleSpy.mockRestore();
  });
});
