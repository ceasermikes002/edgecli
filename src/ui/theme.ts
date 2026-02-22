import gradient from 'gradient-string';
import chalk from 'chalk';

// Brand gradient colors: #e4b795, #699acd, #2f679f
export const brandGradient = gradient(['#e4b795', '#699acd', '#2f679f']);

// Color palette
export const colors = {
  primary: chalk.hex('#699acd'),
  secondary: chalk.hex('#e4b795'),
  accent: chalk.hex('#2f679f'),
  success: chalk.hex('#4ade80'),
  warning: chalk.hex('#fbbf24'),
  error: chalk.hex('#ef4444'),
  info: chalk.hex('#699acd'),
  muted: chalk.hex('#6b7280'),
  
  // Severity colors
  severityLow: chalk.hex('#4ade80'),
  severityMedium: chalk.hex('#fbbf24'),
  severityHigh: chalk.hex('#fb923c'),
  severityCritical: chalk.hex('#ef4444').bold,
};

// Text styles
export const styles = {
  title: (text: string) => brandGradient(text),
  subtitle: (text: string) => colors.primary(text),
  highlight: (text: string) => colors.secondary.bold(text),
  code: (text: string) => colors.accent(text),
  success: (text: string) => colors.success('✓ ' + text),
  error: (text: string) => colors.error('✗ ' + text),
  warning: (text: string) => colors.warning('⚠ ' + text),
  info: (text: string) => colors.info('ℹ ' + text),
  muted: (text: string) => colors.muted(text),
  
  // Special formatting
  badge: (text: string, color: any = colors.primary) => color(` ${text} `),
  metric: (label: string, value: string | number) => 
    `${colors.muted(label)}: ${colors.secondary.bold(value.toString())}`,
};

// Box styles for important messages
export const boxStyles = {
  default: {
    padding: 1,
    margin: 1,
    borderStyle: 'round' as const,
    borderColor: '#699acd',
  },
  success: {
    padding: 1,
    margin: 1,
    borderStyle: 'round' as const,
    borderColor: '#4ade80',
  },
  error: {
    padding: 1,
    margin: 1,
    borderStyle: 'round' as const,
    borderColor: '#ef4444',
  },
  info: {
    padding: 1,
    margin: 1,
    borderStyle: 'round' as const,
    borderColor: '#699acd',
  },
};

// ASCII art logo
export const logo = `
███████╗██████╗  ██████╗ ███████╗     ██████╗██╗     ██╗
██╔════╝██╔══██╗██╔════╝ ██╔════╝    ██╔════╝██║     ██║
█████╗  ██║  ██║██║  ███╗█████╗      ██║     ██║     ██║
██╔══╝  ██║  ██║██║   ██║██╔══╝      ██║     ██║     ██║
███████╗██████╔╝╚██████╔╝███████╗    ╚██████╗███████╗██║
╚══════╝╚═════╝  ╚═════╝ ╚══════╝     ╚═════╝╚══════╝╚═╝
`;

export const miniLogo = `
╔═══════════════════════════════════════╗
║  ⚡ EDGE CLI - AI-Powered Triage ⚡  ║
╚═══════════════════════════════════════╝
`;
