import * as fs from 'fs';
import { GeminiClient } from '../gemini-client';
import { UIComponents } from '../ui/components';
import { colors, styles, brandGradient } from '../ui/theme';
import { configManager } from '../config';

export async function suggestCommand(options: { file: string; incident?: string }): Promise<void> {
  const apiKey = configManager.getApiKey();
  
  if (!apiKey) {
    UIComponents.showError('API key not configured. Run "edgecli init" to set up.');
    process.exit(1);
  }

  if (!fs.existsSync(options.file)) {
    UIComponents.showError(`File not found: ${options.file}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(options.file, 'utf-8');
  const model = configManager.getModel();
  const client = new GeminiClient(apiKey, model);

  UIComponents.showMiniLogo();
  console.log(styles.subtitle('  Code Analysis & Patch Generation\n'));
  console.log(colors.muted(`  Using model: ${colors.secondary(model)}\n`));
  
  console.log(brandGradient('┌─ Analyzing File ' + '─'.repeat(31)));
  console.log(brandGradient('│ ') + colors.secondary(options.file));
  console.log(brandGradient('└' + '─'.repeat(49)));
  console.log();

  const summary = `File: ${options.file}\n\nContent:\n${fileContent.substring(0, 2000)}`;
  
  const spinner = UIComponents.createSpinner('Analyzing code with Gemini...');
  spinner.start();
  
  try {
    const { result, metrics } = await client.deepAnalysis(summary);
    spinner.succeed(colors.success('Analysis complete'));
    
    UIComponents.showDeepAnalysis(result);
    UIComponents.showMetrics({
      'Latency': `${metrics.latency}ms`,
      'Tokens': metrics.tokens,
    });
  } catch (error: any) {
    spinner.fail(colors.error('Analysis failed'));
    UIComponents.showError(error.message);
  }
}
