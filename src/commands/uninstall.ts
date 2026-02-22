import prompts from 'prompts';
import { UIComponents } from '../ui/components';
import { colors, brandGradient } from '../ui/theme';
import { configManager } from '../config';
import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

export async function uninstallCommand(): Promise<void> {
  UIComponents.showMiniLogo();
  
  console.log(brandGradient('┌─ Uninstall EdgeCLI ' + '─'.repeat(28)));
  console.log(brandGradient('│'));
  console.log(brandGradient('│ ') + colors.warning('This will completely remove EdgeCLI'));
  console.log(brandGradient('│'));
  console.log(brandGradient('└' + '─'.repeat(49)));
  console.log();

  // Show what will be removed
  const configPath = configManager.getConfigPath();
  const configDir = path.dirname(configPath);
  
  console.log(colors.info('The following will be removed:'));
  console.log();
  
  let itemsToRemove: string[] = [];
  
  // Check if config file exists
  if (fs.existsSync(configPath)) {
    itemsToRemove.push(`  ${colors.accent('•')} Configuration file: ${colors.muted(configPath)}`);
  }
  
  // Check if config directory exists
  if (fs.existsSync(configDir)) {
    itemsToRemove.push(`  ${colors.accent('•')} Configuration directory: ${colors.muted(configDir)}`);
  }
  
  // Check for session stats
  const statsPath = path.join(configDir, 'session-stats.json');
  if (fs.existsSync(statsPath)) {
    itemsToRemove.push(`  ${colors.accent('•')} Session statistics: ${colors.muted(statsPath)}`);
  }
  
  // Add npm package to removal list
  itemsToRemove.push(`  ${colors.accent('•')} EdgeCLI npm package (globally installed)`);
  
  if (itemsToRemove.length === 1) {
    // Only npm package in list, no config found
    console.log(colors.muted('  No configuration files found'));
    console.log(`  ${colors.accent('•')} EdgeCLI npm package (globally installed)`);
    console.log();
  } else {
    itemsToRemove.forEach(item => console.log(item));
    console.log();
  }
  
  // Show what's configured
  const config = configManager.getAll();
  if (config.apiKey) {
    console.log(brandGradient('┌─ Current Configuration ' + '─'.repeat(24)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.muted('Gemini API Key: ') + colors.secondary('Configured ✓'));
    console.log(brandGradient('│ ') + colors.muted('Gemini Model: ') + colors.secondary(config.model || 'default'));
    
    if (config.elevenlabs?.apiKey) {
      console.log(brandGradient('│ ') + colors.muted('ElevenLabs API Key: ') + colors.secondary('Configured ✓'));
      console.log(brandGradient('│ ') + colors.muted('Voice Alerts: ') + (config.elevenlabs.enabled ? colors.success('Enabled') : colors.muted('Disabled')));
    }
    
    console.log(brandGradient('│'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    console.log();
  }
  
  // Confirm uninstall
  const { confirmUninstall } = await prompts({
    type: 'confirm',
    name: 'confirmUninstall',
    message: 'Are you sure you want to completely remove EdgeCLI?',
    initial: false,
  });

  if (!confirmUninstall) {
    console.log(colors.info('\n✓ Uninstall cancelled'));
    return;
  }

  // Additional confirmation for safety
  const { finalConfirm } = await prompts({
    type: 'confirm',
    name: 'finalConfirm',
    message: 'This will uninstall the package and delete all data. Continue?',
    initial: false,
  });

  if (!finalConfirm) {
    console.log(colors.info('\n✓ Uninstall cancelled'));
    return;
  }

  // Perform cleanup
  const spinner = UIComponents.createSpinner('Removing configuration...');
  spinner.start();

  try {
    let removedCount = 0;

    // Remove config file
    if (fs.existsSync(configPath)) {
      await fs.promises.unlink(configPath);
      removedCount++;
    }

    // Remove session stats
    if (fs.existsSync(statsPath)) {
      await fs.promises.unlink(statsPath);
      removedCount++;
    }

    // Remove config directory if empty
    if (fs.existsSync(configDir)) {
      const files = await fs.promises.readdir(configDir);
      if (files.length === 0) {
        await fs.promises.rmdir(configDir);
        removedCount++;
      }
    }

    spinner.succeed(colors.success(`Removed ${removedCount} configuration item(s)`));

    // Unlink/Uninstall npm package
    console.log();
    const uninstallSpinner = UIComponents.createSpinner('Removing EdgeCLI package...');
    uninstallSpinner.start();

    // Try npm unlink first (for local development), then npm uninstall (for published package)
    let unlinkSuccess = false;
    
    try {
      await new Promise<void>((resolve, reject) => {
        const unlink = spawn('npm', ['unlink', '-g', 'edgecli'], {
          stdio: ['ignore', 'pipe', 'pipe'],
          shell: true,
        });

        unlink.on('close', (code) => {
          if (code === 0) {
            unlinkSuccess = true;
            resolve();
          } else {
            reject(new Error('unlink failed'));
          }
        });

        unlink.on('error', reject);
      });
    } catch {
      // If unlink fails, try uninstall
      try {
        await new Promise<void>((resolve, reject) => {
          const uninstall = spawn('npm', ['uninstall', '-g', 'edgecli'], {
            stdio: ['ignore', 'pipe', 'pipe'],
            shell: true,
          });

          uninstall.on('close', (code) => {
            if (code === 0) {
              resolve();
            } else {
              reject(new Error('uninstall failed'));
            }
          });

          uninstall.on('error', reject);
        });
      } catch {
        // Both failed, package might not be installed
        uninstallSpinner.warn(colors.warning('Package not found (may already be removed)'));
      }
    }

    if (unlinkSuccess) {
      uninstallSpinner.succeed(colors.success('EdgeCLI package unlinked'));
    } else {
      uninstallSpinner.succeed(colors.success('EdgeCLI package removed'));
    }

    // Show summary
    console.log();
    console.log(brandGradient('┌─ Uninstall Complete ' + '─'.repeat(27)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.success('✓ Configuration removed'));
    console.log(brandGradient('│ ') + colors.success('✓ Session data cleared'));
    console.log(brandGradient('│ ') + colors.success('✓ Package removed'));
    console.log(brandGradient('│'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    console.log();

    // Show next steps
    console.log(colors.info('EdgeCLI has been completely removed from your system.'));
    console.log();
    console.log(colors.muted('To reinstall EdgeCLI:'));
    console.log();
    console.log(colors.muted('  For local development:'));
    console.log(colors.accent('    cd /path/to/edgecli'));
    console.log(colors.accent('    npm install'));
    console.log(colors.accent('    npm run build'));
    console.log(colors.accent('    npm link'));
    console.log();
    console.log(colors.muted('  From npm (when published):'));
    console.log(colors.accent('    npm install -g edgecli'));
    console.log();
    console.log(colors.muted('  Then run setup:'));
    console.log(colors.accent('    edgecli init'));
    console.log();
    console.log(colors.muted('Thank you for using EdgeCLI! 👋'));
    console.log();

  } catch (error: any) {
    spinner.fail(colors.error('Failed to complete uninstall'));
    console.error(colors.error(`\nError: ${error.message}`));
    console.log();
    console.log(colors.warning('⚠  Some items may not have been removed'));
    console.log();
    console.log(colors.muted('You can manually complete the uninstall:'));
    console.log(colors.accent('  npm unlink -g edgecli'));
    console.log(colors.muted('  or'));
    console.log(colors.accent('  npm uninstall -g edgecli'));
    if (fs.existsSync(configDir)) {
      console.log(colors.muted('  Delete config: ') + colors.accent(configDir));
    }
    process.exit(1);
  }
}
