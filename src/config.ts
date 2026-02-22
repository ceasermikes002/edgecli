import Conf from 'conf';

export interface EdgeCLIConfig {
  apiKey?: string;
  model?: string;
  elevenlabs?: {
    apiKey?: string;
    enabled?: boolean;
    model?: string;
    voiceId?: string;
    severityThreshold?: 'info' | 'warning' | 'error' | 'critical';
    streaming?: boolean;
  };
}

// Available Gemini models (as of 2024)
export const GEMINI_MODELS = [
  {
    name: 'gemini-2.5-flash',
    description: 'Latest flash model - Fast and efficient',
    recommended: true,
  },
  {
    name: 'gemini-2.5-pro',
    description: 'Most capable 2.5 model - Best for complex analysis',
    recommended: false,
  },
  {
    name: 'gemini-2.0-flash',
    description: 'Stable 2.0 flash - Fast and reliable',
    recommended: false,
  },
  {
    name: 'gemini-3-flash',
    description: 'Next-gen flash model - Cutting edge',
    recommended: false,
  },
  {
    name: 'gemini-3-pro',
    description: 'Next-gen pro model - Maximum capability',
    recommended: false,
  },
];

export const DEFAULT_MODEL = 'gemini-2.5-flash';

class ConfigManager {
  private config: Conf<EdgeCLIConfig>;

  constructor() {
    this.config = new Conf<EdgeCLIConfig>({
      projectName: 'edgecli',
      defaults: {
        model: DEFAULT_MODEL,
      },
    });
  }

  getApiKey(): string | undefined {
    // Priority: env var > config file
    return process.env.GEMINI_API_KEY || this.config.get('apiKey');
  }

  setApiKey(apiKey: string): void {
    this.config.set('apiKey', apiKey);
  }

  getModel(): string {
    return this.config.get('model') || DEFAULT_MODEL;
  }

  setModel(model: string): void {
    this.config.set('model', model);
  }

  // ElevenLabs configuration
  getElevenLabsApiKey(): string | undefined {
    return process.env.ELEVENLABS_API_KEY || this.config.get('elevenlabs.apiKey');
  }

  setElevenLabsApiKey(apiKey: string): void {
    this.config.set('elevenlabs.apiKey', apiKey);
  }

  getElevenLabsConfig(): EdgeCLIConfig['elevenlabs'] {
    return this.config.get('elevenlabs') || {
      enabled: false,
      model: 'eleven_multilingual_v2',
      voiceId: 'JBFqnCBsd6RMkjVDRZzb',
      severityThreshold: 'warning',
      streaming: true,
    };
  }

  setElevenLabsConfig(config: EdgeCLIConfig['elevenlabs']): void {
    this.config.set('elevenlabs', config);
  }

  updateElevenLabsConfig(config: Partial<EdgeCLIConfig['elevenlabs']>): void {
    const current = this.getElevenLabsConfig();
    this.config.set('elevenlabs', { ...current, ...config });
  }

  getAll(): EdgeCLIConfig {
    return {
      apiKey: this.getApiKey(),
      model: this.getModel(),
      elevenlabs: this.getElevenLabsConfig(),
    };
  }

  clear(): void {
    this.config.clear();
  }

  getConfigPath(): string {
    return this.config.path;
  }
}

export const configManager = new ConfigManager();
