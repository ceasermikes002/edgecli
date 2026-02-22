import prompts from 'prompts';
import { UIComponents } from '../ui/components';
import { colors, styles, brandGradient } from '../ui/theme';
import { configManager, GEMINI_MODELS } from '../config';
import { ELEVENLABS_MODELS, ELEVENLABS_VOICES, VOICE_DESCRIPTIONS } from '../voice/constants';
import { ElevenLabsClient } from '../voice/elevenlabs-client';

export async function initCommand(): Promise<void> {
  UIComponents.showWelcome();
  
  console.log(brandGradient('┌─ Interactive Setup ' + '─'.repeat(28)));
  console.log(brandGradient('│'));
  console.log(brandGradient('│ ') + styles.subtitle('Configure EdgeCLI with your Gemini API settings'));
  console.log(brandGradient('│'));
  console.log(brandGradient('└' + '─'.repeat(49)));
  console.log();

  // Check if already configured
  const existingConfig = configManager.getAll();
  if (existingConfig.apiKey) {
    console.log(colors.info('ℹ  Existing configuration found'));
    console.log(colors.muted(`   API Key: ${existingConfig.apiKey.substring(0, 10)}...`));
    console.log(colors.muted(`   Model: ${existingConfig.model}`));
    console.log();
    
    const { reconfigure } = await prompts({
      type: 'confirm',
      name: 'reconfigure',
      message: 'Do you want to reconfigure?',
      initial: false,
    });

    if (!reconfigure) {
      UIComponents.showSuccess('Configuration unchanged. You\'re all set!');
      return;
    }
  }

  // Step 1: API Key
  console.log(brandGradient('┌─ Step 1: API Key ' + '─'.repeat(30)));
  console.log(brandGradient('│'));
  console.log(brandGradient('│ ') + colors.muted('Get your key from: ') + colors.secondary.underline('https://aistudio.google.com/app/apikey'));
  console.log(brandGradient('│'));
  console.log(brandGradient('└' + '─'.repeat(49)));
  console.log();

  const { apiKey } = await prompts({
    type: 'password',
    name: 'apiKey',
    message: 'Enter your Gemini API key:',
    validate: (value: string) => value.length > 0 ? true : 'API key is required',
  });

  if (!apiKey) {
    console.log(colors.error('\n✗ Setup cancelled'));
    process.exit(0);
  }

  // Step 2: Model Selection
  console.log();
  console.log(brandGradient('┌─ Step 2: Model Selection ' + '─'.repeat(22)));
  console.log(brandGradient('│'));
  console.log(brandGradient('│ ') + colors.muted('Choose the Gemini model for analysis'));
  console.log(brandGradient('│'));
  console.log(brandGradient('└' + '─'.repeat(49)));
  console.log();

  const modelChoices = GEMINI_MODELS.map(model => ({
    title: `${model.name}${model.recommended ? ' ⭐ (Recommended)' : ''}`,
    description: model.description,
    value: model.name,
  }));

  const { model } = await prompts({
    type: 'select',
    name: 'model',
    message: 'Select a model:',
    choices: modelChoices,
    initial: 0,
  });

  if (!model) {
    console.log(colors.error('\n✗ Setup cancelled'));
    process.exit(0);
  }

  // Save configuration
  const spinner = UIComponents.createSpinner('Saving configuration...');
  spinner.start();
  
  try {
    configManager.setApiKey(apiKey);
    configManager.setModel(model);
    
    spinner.succeed(colors.success('Gemini configuration saved!'));
    
    // Step 3: ElevenLabs Voice Setup (Optional)
    console.log();
    console.log(brandGradient('┌─ Step 3: Voice Alerts (Optional) ' + '─'.repeat(14)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.muted('Enable AI voice alerts for critical incidents'));
    console.log(brandGradient('│'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    console.log();

    const { enableVoice } = await prompts({
      type: 'confirm',
      name: 'enableVoice',
      message: 'Enable voice alerts with ElevenLabs?',
      initial: false,
    });

    if (enableVoice) {
      console.log();
      console.log(colors.muted('Get your ElevenLabs API key from: ') + colors.secondary.underline('https://elevenlabs.io/app/settings/api-keys'));
      console.log();

      const { elevenLabsApiKey } = await prompts({
        type: 'password',
        name: 'elevenLabsApiKey',
        message: 'Enter your ElevenLabs API key:',
        validate: (value: string) => value.length > 0 ? true : 'API key is required',
      });

      if (elevenLabsApiKey) {
        // Validate API key
        const validateSpinner = UIComponents.createSpinner('Validating ElevenLabs API key...');
        validateSpinner.start();
        
        const client = new ElevenLabsClient({ apiKey: elevenLabsApiKey });
        const isValid = await client.validateApiKey();
        
        if (!isValid) {
          validateSpinner.fail(colors.error('Invalid API key'));
          console.log(colors.warning('⚠  Voice alerts will be disabled. You can configure this later.'));
        } else {
          validateSpinner.succeed(colors.success('API key validated!'));
          
          // Voice selection
          console.log();
          console.log(colors.muted('Select a voice for alerts:'));
          console.log();

          const voiceChoices = Object.entries(VOICE_DESCRIPTIONS).map(([key, description]) => ({
            title: description,
            value: ELEVENLABS_VOICES[key as keyof typeof ELEVENLABS_VOICES],
          }));

          const { voiceId } = await prompts({
            type: 'select',
            name: 'voiceId',
            message: 'Choose a voice:',
            choices: voiceChoices,
            initial: voiceChoices.findIndex(v => v.value === ELEVENLABS_VOICES.GEORGE),
          });

          // Model selection
          const { voiceModel } = await prompts({
            type: 'select',
            name: 'voiceModel',
            message: 'Choose a voice model:',
            choices: [
              { title: 'Multilingual V2 ⭐ (Recommended) - Emotionally rich', value: ELEVENLABS_MODELS.V3 },
              { title: 'Turbo V2.5 - High quality + low latency', value: ELEVENLABS_MODELS.TURBO_V2_5 },
              { title: 'Flash V2.5 - Fastest (<75ms), 0.5x cost', value: ELEVENLABS_MODELS.FLASH_V2_5 },
              { title: 'Flash V2 - Fast, good quality', value: ELEVENLABS_MODELS.FLASH_V2 },
            ],
            initial: 0,
          });

          // Severity threshold
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
            initial: 1,
          });

          configManager.setElevenLabsConfig({
            apiKey: elevenLabsApiKey,
            enabled: true,
            model: voiceModel || ELEVENLABS_MODELS.V3,
            voiceId: voiceId || ELEVENLABS_VOICES.GEORGE,
            severityThreshold: severityThreshold || 'warning',
            streaming: true,
          });

          console.log(colors.success('\n✓ Voice alerts configured!'));
        }
      }
    } else {
      configManager.setElevenLabsConfig({
        enabled: false,
        model: ELEVENLABS_MODELS.V3,
        voiceId: ELEVENLABS_VOICES.GEORGE,
        severityThreshold: 'warning',
        streaming: true,
      });
    }
    
    // Show summary
    console.log();
    console.log(brandGradient('┌─ Configuration Summary ' + '─'.repeat(24)));
    console.log(brandGradient('│'));
    console.log(brandGradient('│ ') + colors.muted('API Key: ') + colors.secondary(`${apiKey.substring(0, 10)}...`));
    console.log(brandGradient('│ ') + colors.muted('Model: ') + colors.secondary(model));
    
    const elevenLabsConfig = configManager.getElevenLabsConfig();
    if (elevenLabsConfig && elevenLabsConfig.enabled) {
      console.log(brandGradient('│ ') + colors.muted('Voice Alerts: ') + colors.success('Enabled'));
      console.log(brandGradient('│ ') + colors.muted('Voice Model: ') + colors.secondary(elevenLabsConfig.model || 'default'));
      console.log(brandGradient('│ ') + colors.muted('Severity: ') + colors.secondary(elevenLabsConfig.severityThreshold || 'warning'));
    } else {
      console.log(brandGradient('│ ') + colors.muted('Voice Alerts: ') + colors.muted('Disabled'));
    }
    
    console.log(brandGradient('│ ') + colors.muted('Config File: ') + colors.accent(configManager.getConfigPath()));
    console.log(brandGradient('│'));
    console.log(brandGradient('└' + '─'.repeat(49)));
    
    UIComponents.showSuccess('Setup complete! Try "edgecli simulate" to test.');
  } catch (error: any) {
    spinner.fail(colors.error('Failed to save configuration'));
    console.error(colors.error(`\nError: ${error.message}`));
    process.exit(1);
  }
}
