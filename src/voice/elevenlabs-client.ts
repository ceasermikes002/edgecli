import { Readable } from 'stream';
import { DEFAULT_VOICE_CONFIG } from './constants';

export interface VoiceConfig {
  apiKey: string;
  model?: string;
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
}

export interface SpeechOptions {
  text: string;
  voiceId?: string;
  model?: string;
}

export class ElevenLabsClient {
  private apiKey: string;
  private config: Required<Omit<VoiceConfig, 'apiKey'>>;

  constructor(config: VoiceConfig) {
    this.apiKey = config.apiKey;
    this.config = {
      model: config.model || DEFAULT_VOICE_CONFIG.model,
      voiceId: config.voiceId || DEFAULT_VOICE_CONFIG.voiceId,
      stability: config.stability ?? DEFAULT_VOICE_CONFIG.stability,
      similarityBoost: config.similarityBoost ?? DEFAULT_VOICE_CONFIG.similarityBoost,
      style: config.style ?? DEFAULT_VOICE_CONFIG.style,
      useSpeakerBoost: config.useSpeakerBoost ?? DEFAULT_VOICE_CONFIG.useSpeakerBoost,
    };
  }

  async textToSpeech(options: SpeechOptions): Promise<Buffer> {
    const voiceId = options.voiceId || this.config.voiceId;
    const model = options.model || this.config.model;

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey,
      },
      body: JSON.stringify({
        text: options.text,
        model_id: model,
        voice_settings: {
          stability: this.config.stability,
          similarity_boost: this.config.similarityBoost,
          style: this.config.style,
          use_speaker_boost: this.config.useSpeakerBoost,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ElevenLabs API error: ${response.status} - ${error}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async textToSpeechStream(options: SpeechOptions): Promise<Readable> {
    const voiceId = options.voiceId || this.config.voiceId;
    const model = options.model || this.config.model;

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey,
      },
      body: JSON.stringify({
        text: options.text,
        model_id: model,
        voice_settings: {
          stability: this.config.stability,
          similarity_boost: this.config.similarityBoost,
          style: this.config.style,
          use_speaker_boost: this.config.useSpeakerBoost,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ElevenLabs API error: ${response.status} - ${error}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    // Convert web ReadableStream to Node.js Readable
    const reader = response.body.getReader();
    const stream = new Readable({
      async read() {
        try {
          const { done, value } = await reader.read();
          if (done) {
            this.push(null);
          } else {
            this.push(Buffer.from(value));
          }
        } catch (error) {
          this.destroy(error as Error);
        }
      },
    });

    return stream;
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/user', {
        headers: {
          'xi-api-key': this.apiKey,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  updateConfig(config: Partial<Omit<VoiceConfig, 'apiKey'>>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }
}
