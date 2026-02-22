import prompts from 'prompts';
import { UIComponents } from '../ui/components';
import { colors, brandGradient } from '../ui/theme';
import { configManager } from '../config';
import { ELEVENLABS_MODELS, ELEVENLABS_VOICES, VOICE_DESCRIPTIONS } from '../voice/constants';
import { ElevenLabsClient } from '../voice/elevenlabs-client';

interface VoiceCommandOptions {
  enable?: boolean;
  disable?: boolean;
  test?: boolean;
  configure?: boolean;
}

export async function voiceCommand(options: VoiceCommandOptions): Promise<void> {
  const config = configManager.getElevenLabsConfig() || {
    enabled: false,
    model: 'eleven_multilingual_v2',
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
    severityThreshold: 'warning' as const,
    streaming: true,
  };

  // Handle --enable flag
  if (options.enable) {
    if (!config.apiKey) {
      console.log(colors.error('✗ No ElevenLabs API key configured'));
      console.log(colors.muted('  Run: ') + colors.accent('edgecli init') + colors.muted(' to set up voice alerts'));
      process.exit(1);
    }
    
    configManager.updateElevenLabsConfig({ enabled: true });
    UIComponents.showSuccess('Voice alerts enabled!');
    return;
  }

  // Handle --disable flag
  if (options.disable) {
    configManager.updateElevenLabsConfig({ enabled: false });
    UIComponents.showSuccess('Voice alerts disabled');
    return;
  }

  // Handle --test flag
  if (options.test) {
    if (!config.apiKey) {
      console.log(colors.error('✗ No ElevenLabs API key configured'));
      console.log(colors.muted('  Run: ') + colors.accent('edgecli init') + colors.muted(' to set up voice alerts'));
      console.log(colors.muted('  Or set: ') + colors.accent('ELEVENLABS_API_KEY') + colors.muted(' environment variable'));
      process.exit(1);
    }

    console.log(colors.info('Testing voice configuration:'));
    console.log(colors.muted(`  Model: ${config.model}`));
    console.log(colors.muted(`  Voice: ${Object.entries(ELEVENLABS_VOICES).find(([_, id]) => id === config.voiceId)?.[0] || 'Custom'}`));
    console.log(colors.muted(`  Streaming: ${config.streaming ? 'Enabled' : 'Disabled'}`));
    console.log();

    const spinner = UIComponents.createSpinner('Testing voice output...');
    spinner.start();

    try {
      const client = new ElevenLabsClient({
        apiKey: config.apiKey!,
        model: config.model,
        voiceId: config.voiceId,
      });

      const testMessage = 'Critical alert. Database connection failure detected. Confidence: 95 percent. Escalating to deep analysis.';
      
      console.log(colors.muted(`\n  Generating audio...`));
      
      // Import AudioPlayer dynamically to avoid issues
      const { AudioPlayer } = await import('../voice/audio-player');
      
      if (config.streaming) {
        const stream = await client.textToSpeechStream({ text: testMessage });
        console.log(colors.muted(`  Playing audio (streaming)...`));
        await AudioPlayer.playStream(stream);
      } else {
        const audio = await client.textToSpeech({ text: testMessage });
        console.log(colors.muted(`  Playing audio (${audio.length} bytes)...`));
        await AudioPlayer.play(audio);
      }

      spinner.succeed(colors.success('Voice test successful!'));
      console.log(colors.muted('\n  If you didn\'t hear audio, check:'));
      console.log(colors.muted('  • System volume is not muted'));
      console.log(colors.muted('  • Speakers/headphones are connected'));
      console.log(colors.muted('  • Audio drivers are working'));
    } catch (error: any) {
      spinner.fail(colors.error('Voice test failed'));
      console.error(colors.error(`\nError: ${error.message}`));
      console.log(colors.muted('\nTroubleshooting:'));
      console.log(colors.muted('  • Verify API key at https://elevenlabs.io/app/settings/api-keys'));
      console.log(colors.muted('  • Check internet connection'));
      console.log(colors.muted('  • Ensure audio system is working'));
      process.exit(1);
    }
    return;
  }

  // Handle --configure or no flags (interactive configuration)
  UIComponents.showMiniLogo();
  console.log(brandGradient('┌─ Voice Configuration ' + '─'.repeat(27)));
  console.log(brandGradient('│'));
  console.log(brandGradient('│ ') + colors.muted('Configure AI voice alerts for EdgeCLI'));
  console.log(brandGradient('│'));
  console.log(brandGradient('└' + '─'.repeat(49)));
  console.log();

  // Show current configuration
  if (config.apiKey) {
    console.log(colors.info('Current Configuration:'));
    console.log(colors.muted(`  Status: ${config.enabled ? colors.success('Enabled') : colors.warning('Disabled')}`));
    console.log(colors.muted(`  Model: ${config.model}`));
    console.log(colors.muted(`  Voice: ${Object.entries(ELEVENLABS_VOICES).find(([_, id]) => id === config.voiceId)?.[0] || 'Custom'}`));
    console.log(colors.muted(`  Severity: ${config.severityThreshold}`));
    console.log();
  }

  const { action } = await prompts({
    type: 'select',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      { title: 'Change voice', value: 'voice' },
      { title: 'Change model', value: 'model' },
      { title: 'Change severity threshold', value: 'severity' },
      { title: 'Update API key', value: 'apikey' },
      { title: config.enabled ? 'Disable voice alerts' : 'Enable voice alerts', value: 'toggle' },
      { title: 'Test voice output', value: 'test' },
    ],
  });

  if (!action) {
    return;
  }

  switch (action) {
    case 'voice': {
      const voiceChoices = Object.entries(VOICE_DESCRIPTIONS).map(([key, description]) => ({
        title: description,
        value: ELEVENLABS_VOICES[key as keyof typeof ELEVENLABS_VOICES],
      }));

      const { voiceId } = await prompts({
        type: 'select',
        name: 'voiceId',
        message: 'Choose a voice:',
        choices: voiceChoices,
        initial: voiceChoices.findIndex(v => v.value === config.voiceId),
      });

      if (voiceId) {
        configManager.updateElevenLabsConfig({ voiceId });
        UIComponents.showSuccess('Voice updated!');
      }
      break;
    }

    case 'model': {
      const { model } = await prompts({
        type: 'select',
        name: 'model',
        message: 'Choose a voice model:',
        choices: [
          { title: 'Multilingual V2 ⭐ (Recommended) - Emotionally rich', value: ELEVENLABS_MODELS.V3 },
          { title: 'Turbo V2.5 - High quality + low latency', value: ELEVENLABS_MODELS.TURBO_V2_5 },
          { title: 'Flash V2.5 - Fastest (<75ms), 0.5x cost', value: ELEVENLABS_MODELS.FLASH_V2_5 },
          { title: 'Flash V2 - Fast, good quality', value: ELEVENLABS_MODELS.FLASH_V2 },
        ],
        initial: config.model ? Object.values(ELEVENLABS_MODELS).indexOf(config.model as any) : 0,
      });

      if (model) {
        configManager.updateElevenLabsConfig({ model });
        UIComponents.showSuccess('Model updated!');
      }
      break;
    }

    case 'severity': {
      const { severityThreshold } = await prompts({
        type: 'select',
        name: 'severityThreshold',
        message: 'Speak alerts for severity level:',
        choices: [
          { title: 'Info and above (all alerts)', value: 'info' },
          { title: 'Warning and above ⭐ (Recommended)', value: 'warning' },
          { title: 'Error and above', value: 'error' },
          { title: 'Critical only', value: 'critical' },
        ],
        initial: ['info', 'warning', 'error', 'critical'].indexOf(config.severityThreshold || 'warning'),
      });

      if (severityThreshold) {
        configManager.updateElevenLabsConfig({ severityThreshold });
        UIComponents.showSuccess('Severity threshold updated!');
      }
      break;
    }

    case 'apikey': {
      console.log();
      console.log(colors.muted('Get your key from: ') + colors.secondary.underline('https://elevenlabs.io/app/settings/api-keys'));
      console.log();

      const { apiKey } = await prompts({
        type: 'password',
        name: 'apiKey',
        message: 'Enter your ElevenLabs API key:',
        validate: (value: string) => value.length > 0 ? true : 'API key is required',
      });

      if (apiKey) {
        const spinner = UIComponents.createSpinner('Validating API key...');
        spinner.start();

        const client = new ElevenLabsClient({ apiKey });
        const isValid = await client.validateApiKey();

        if (!isValid) {
          spinner.fail(colors.error('Invalid API key'));
        } else {
          spinner.succeed(colors.success('API key validated!'));
          configManager.updateElevenLabsConfig({ apiKey });
          UIComponents.showSuccess('API key updated!');
        }
      }
      break;
    }

    case 'toggle': {
      const newState = !config.enabled;
      configManager.updateElevenLabsConfig({ enabled: newState });
      UIComponents.showSuccess(`Voice alerts ${newState ? 'enabled' : 'disabled'}!`);
      break;
    }

    case 'test': {
      if (!config.apiKey) {
        console.log(colors.error('✗ No API key configured'));
        return;
      }

      const spinner = UIComponents.createSpinner('Testing voice output...');
      spinner.start();

      try {
        const client = new ElevenLabsClient({
          apiKey: config.apiKey,
          model: config.model,
          voiceId: config.voiceId,
        });

        const testMessage = 'Critical alert. Database connection failure detected. Confidence: 95 percent. Escalating to deep analysis.';
        
        const { AudioPlayer } = await import('../voice/audio-player');
        
        if (config.streaming) {
          const stream = await client.textToSpeechStream({ text: testMessage });
          await AudioPlayer.playStream(stream);
        } else {
          const audio = await client.textToSpeech({ text: testMessage });
          await AudioPlayer.play(audio);
        }

        spinner.succeed(colors.success('Voice test successful!'));
      } catch (error: any) {
        spinner.fail(colors.error('Voice test failed'));
        console.error(colors.error(`\nError: ${error.message}`));
      }
      break;
    }
  }
}
