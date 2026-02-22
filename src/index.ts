#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { watchCommand } from './commands/watch';
import { suggestCommand } from './commands/suggest';
import { simulateCommand } from './commands/simulate';
import { statsCommand } from './commands/stats';
import { voiceCommand } from './commands/voice';
import { UIComponents } from './ui/components';
import { brandGradient, colors } from './ui/theme';

const program = new Command();

// Custom help display
program.configureHelp({
  formatHelp: (cmd, helper) => {
    UIComponents.showMiniLogo();
    console.log(colors.primary('  AI-Powered Log Triage & Incident Analysis\n'));
    
    console.log(brandGradient('┌─ Usage ' + '─'.repeat(40)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.accent('edgecli') + colors.muted(' [options] [command]'));
    console.log(brandGradient('│'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    
    console.log();
    console.log(brandGradient('┌─ Commands ' + '─'.repeat(37)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.secondary('init') + colors.muted('                    Interactive setup wizard'));
    console.log(brandGradient('│ ') + colors.secondary('watch') + colors.muted(' [file]            Watch and triage logs in real-time'));
    console.log(brandGradient('│ ') + colors.secondary('suggest') + colors.muted(' --file <path>    Generate patch suggestions'));
    console.log(brandGradient('│ ') + colors.secondary('simulate') + colors.muted('                 Generate mock errors for testing'));
    console.log(brandGradient('│ ') + colors.secondary('stats') + colors.muted('                   Display session statistics'));
    console.log(brandGradient('│ ') + colors.secondary('voice') + colors.muted('                   Configure voice alerts'));
    console.log(brandGradient('│'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    
    console.log();
    console.log(brandGradient('┌─ Options ' + '─'.repeat(38)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.secondary('-V, --version') + colors.muted('          Output the version number'));
    console.log(brandGradient('│ ') + colors.secondary('-h, --help') + colors.muted('             Display help information'));
    console.log(brandGradient('│'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    
    console.log();
    console.log(brandGradient('┌─ Examples ' + '─'.repeat(37)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.muted('# Interactive setup'));
    console.log(brandGradient('│ ') + colors.accent('edgecli init'));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.muted('# Watch logs from stdin'));
    console.log(brandGradient('│ ') + colors.accent('npm run dev 2>&1 | edgecli watch --stdin'));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.muted('# Analyze a file'));
    console.log(brandGradient('│ ') + colors.accent('edgecli suggest --file src/auth.js'));
    console.log(brandGradient('│'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    
    console.log();
    console.log(colors.muted('  Get started: ') + colors.accent('edgecli init'));
    console.log();
    
    return '';
  },
});

program
  .name('edgecli')
  .description('AI-powered log triage and incident analysis using Google Gemini API')
  .version('1.0.0');

program
  .command('init')
  .description('Interactive setup wizard')
  .action(initCommand);

program
  .command('watch [file]')
  .description('Watch and triage logs in real-time')
  .option('--stdin', 'Read from stdin instead of file')
  .option('--voice', 'Enable voice alerts (overrides config)')
  .option('--no-voice', 'Disable voice alerts (overrides config)')
  .action(watchCommand);

program
  .command('suggest')
  .description('Generate patch suggestions for a file')
  .requiredOption('--file <path>', 'File path to analyze')
  .option('--incident <id>', 'Incident ID to reference')
  .action(suggestCommand);

program
  .command('simulate')
  .description('Generate mock errors for testing')
  .action(simulateCommand);

program
  .command('stats')
  .description('Display session statistics')
  .action(statsCommand);

program
  .command('voice')
  .description('Configure voice alerts')
  .option('--enable', 'Enable voice alerts')
  .option('--disable', 'Disable voice alerts')
  .option('--test', 'Test voice output')
  .option('--configure', 'Interactive voice configuration')
  .action(voiceCommand);

program.parse();
