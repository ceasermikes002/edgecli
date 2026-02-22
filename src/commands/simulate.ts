import { UIComponents } from '../ui/components';
import { colors, styles, brandGradient } from '../ui/theme';

export function simulateCommand(): void {
  UIComponents.showMiniLogo();
  console.log(styles.subtitle('  Mock Error Generator\n'));
  
  const mockErrors = [
    'ERROR: JWT token validation failed - invalid signature',
    'ERROR: Database connection timeout after 5000ms',
    'WARN: Memory usage at 87%',
    'ERROR: Null pointer exception in auth.js:42',
    'ERROR: Failed to fetch user data - 500 Internal Server Error',
    'ERROR: Undefined property access: Cannot read property "id" of undefined',
    'WARN: Deprecated API endpoint /v1/users called',
    'ERROR: Rate limit exceeded - 429 Too Many Requests'
  ];

  console.log(brandGradient('┌─ Generating Mock Logs ' + '─'.repeat(25)));
  console.log(brandGradient('│'));
  
  mockErrors.forEach((error, i) => {
    setTimeout(() => {
      const timestamp = new Date().toISOString();
      const logLine = `[${timestamp}] ${error}`;
      
      if (error.includes('ERROR')) {
        console.log(brandGradient('│ ') + colors.error(logLine));
      } else if (error.includes('WARN')) {
        console.log(brandGradient('│ ') + colors.warning(logLine));
      } else {
        console.log(brandGradient('│ ') + colors.muted(logLine));
      }
    }, i * 200);
  });

  setTimeout(() => {
    console.log(brandGradient('│'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    UIComponents.showSuccess('Simulation complete! Pipe this to "edgecli watch --stdin" to test.');
  }, mockErrors.length * 200 + 100);
}
