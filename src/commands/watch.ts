import chokidar from 'chokidar';
import * as readline from 'readline';
import { GeminiClient } from '../gemini-client';
import { LogProcessor } from '../log-processor';
import { SessionStats } from '../session-stats';
import { UIComponents } from '../ui/components';
import { colors, styles, brandGradient } from '../ui/theme';
import { configManager } from '../config';
import { VoiceManager } from '../voice/voice-manager';

export async function watchCommand(file?: string, options?: { stdin?: boolean; voice?: boolean; noVoice?: boolean }): Promise<void> {
  const apiKey = configManager.getApiKey();
  
  if (!apiKey) {
    UIComponents.showError('API key not configured. Run "edgecli init" to set up.');
    process.exit(1);
  }

  const model = configManager.getModel();
  const client = new GeminiClient(apiKey, model);
  const processor = new LogProcessor();
  const stats = SessionStats.getInstance();

  // Initialize voice manager
  const elevenLabsConfig = configManager.getElevenLabsConfig() || {
    enabled: false,
    model: 'eleven_multilingual_v2',
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
    severityThreshold: 'warning' as const,
    streaming: true,
  };
  
  let voiceEnabled = elevenLabsConfig.enabled || false;
  
  // Command-line flags override config
  if (options?.voice) voiceEnabled = true;
  if (options?.noVoice) voiceEnabled = false;
  
  const voiceManager = new VoiceManager({
    ...elevenLabsConfig,
    apiKey: elevenLabsConfig.apiKey || '',
    enabled: voiceEnabled && !!elevenLabsConfig.apiKey,
  });

  UIComponents.showMiniLogo();
  console.log(styles.subtitle('  Real-Time Log Analysis\n'));
  console.log(colors.muted(`  Using model: ${colors.secondary(model)}`));
  
  if (voiceManager.isEnabled()) {
    console.log(colors.muted(`  Voice alerts: ${colors.success('Enabled')} (${elevenLabsConfig.severityThreshold || 'warning'}+)`));
  } else if (elevenLabsConfig.apiKey && !voiceEnabled) {
    console.log(colors.muted(`  Voice alerts: ${colors.warning('Disabled')} (use --voice to enable)`));
  }
  console.log();

  if (options?.stdin) {
    console.log(brandGradient('┌─ Watching stdin ' + '─'.repeat(31)));
    console.log(brandGradient('│ ') + colors.muted('Press Ctrl+C to stop'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    console.log();
    watchStdin(client, processor, stats, voiceManager);
  } else if (file) {
    console.log(brandGradient('┌─ Watching file ' + '─'.repeat(32)));
    console.log(brandGradient('│ ') + colors.secondary(file));
    console.log(brandGradient('│ ') + colors.muted('Press Ctrl+C to stop'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    console.log();
    watchFile(file, client, processor, stats, voiceManager);
  } else {
    UIComponents.showError('Specify a file or use --stdin flag');
    process.exit(1);
  }

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n' + colors.warning('⏸️  Stopping watch...'));
    stats.printSummary();
    process.exit(0);
  });
}

function watchStdin(client: GeminiClient, processor: LogProcessor, stats: SessionStats, voiceManager: VoiceManager): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', async (line) => {
    processor.addLine(line);
    
    if (processor.shouldBatch()) {
      await processBatch(client, processor, stats, voiceManager);
    }
  });

  rl.on('close', async () => {
    if (processor.hasData()) {
      await processBatch(client, processor, stats, voiceManager);
    }
    console.log('\n' + colors.warning('📊 Stream ended.'));
    stats.printSummary();
    process.exit(0);
  });

  // Periodic check for batching
  setInterval(async () => {
    if (processor.shouldBatch() && processor.hasData()) {
      await processBatch(client, processor, stats, voiceManager);
    }
  }, 1000);
}

function watchFile(file: string, client: GeminiClient, processor: LogProcessor, stats: SessionStats, voiceManager: VoiceManager): void {
  const watcher = chokidar.watch(file, { persistent: true });
  
  watcher.on('change', async () => {
    // In real implementation, read new lines from file
    console.log(colors.muted('File changed, processing...'));
  });

  watcher.on('error', (error) => {
    UIComponents.showError(`Watch error: ${error.message}`);
  });
}

async function processBatch(client: GeminiClient, processor: LogProcessor, stats: SessionStats, voiceManager: VoiceManager): Promise<void> {
  const batch = processor.getBatch();
  const summary = processor.summarize(batch);
  
  const spinner = UIComponents.createSpinner('Processing batch...');
  spinner.start();
  
  try {
    const { result, metrics } = await client.lightTriage(summary);
    spinner.succeed(colors.success('Batch processed'));
    
    stats.recordTriage(result.severity);
    
    UIComponents.showTriageResult(result);
    UIComponents.showMetrics({
      'Latency': `${metrics.latency}ms`,
      'Tokens': metrics.tokens,
      'Timestamp': new Date(metrics.timestamp).toLocaleTimeString(),
    });
    
    // Voice alert for triage
    await voiceManager.speakTriage({
      severity: result.severity,
      hypothesis: result.hypothesis,
      confidence: result.confidence,
      needsDeepAnalysis: result.needs_deeper || result.confidence < 0.65,
    });
    
    if (result.needs_deeper || result.confidence < 0.65) {
      const deepSpinner = UIComponents.createSpinner('Running deep analysis...');
      deepSpinner.start();
      
      const { result: deepResult, metrics: deepMetrics } = await client.deepAnalysis(summary);
      deepSpinner.succeed(colors.success('Deep analysis complete'));
      
      stats.recordDeepAnalysis();
      
      UIComponents.showDeepAnalysis(deepResult);
      UIComponents.showMetrics({
        'Latency': `${deepMetrics.latency}ms`,
        'Tokens': deepMetrics.tokens,
      });
      
      // Voice alert for deep analysis
      await voiceManager.speakDeepAnalysis({
        rootCause: deepResult.root_cause,
        hasPatch: !!(deepResult as any).patch,
      });
    }
  } catch (error: any) {
    spinner.fail(colors.error('Gemini API error'));
    UIComponents.showError(`${error.message}\nRetrying in 5s...`);
    await voiceManager.speakError('API error occurred');
  }
}
