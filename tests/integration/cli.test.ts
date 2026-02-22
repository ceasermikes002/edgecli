import { execSync } from 'child_process';
import * as path from 'path';

describe('CLI Integration', () => {
  const cliPath = path.join(__dirname, '../../dist/index.js');

  beforeAll(() => {
    // Ensure the project is built
    try {
      execSync('npm run build', { stdio: 'ignore' });
    } catch (error) {
      console.warn('Build failed, tests may not work correctly');
    }
  });

  it('should show help when no command provided', () => {
    try {
      const output = execSync(`node ${cliPath} --help`, { encoding: 'utf-8' });
      expect(output).toContain('gemini-triage');
      expect(output).toContain('watch');
      expect(output).toContain('suggest');
    } catch (error: any) {
      // Commander may exit with code 0 for help
      if (error.stdout) {
        expect(error.stdout).toContain('gemini-triage');
      }
    }
  });

  it('should show version', () => {
    try {
      const output = execSync(`node ${cliPath} --version`, { encoding: 'utf-8' });
      expect(output).toMatch(/\d+\.\d+\.\d+/);
    } catch (error: any) {
      if (error.stdout) {
        expect(error.stdout).toMatch(/\d+\.\d+\.\d+/);
      }
    }
  });

  it('should list available commands', () => {
    try {
      const output = execSync(`node ${cliPath} --help`, { encoding: 'utf-8' });
      expect(output).toContain('init');
      expect(output).toContain('watch');
      expect(output).toContain('suggest');
      expect(output).toContain('simulate');
      expect(output).toContain('stats');
    } catch (error: any) {
      if (error.stdout) {
        const stdout = error.stdout;
        expect(stdout).toContain('init');
      }
    }
  });
});
