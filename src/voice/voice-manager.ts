import { ElevenLabsClient, VoiceConfig } from './elevenlabs-client';
import { AudioPlayer } from './audio-player';
import { colors } from '../ui/theme';

export interface VoiceManagerConfig extends VoiceConfig {
  enabled: boolean;
  severityThreshold?: 'info' | 'warning' | 'error' | 'critical';
  streaming?: boolean;
}

export class VoiceManager {
  private client: ElevenLabsClient | null = null;
  private config: VoiceManagerConfig;
  private isPlaying: boolean = false;
  private queue: string[] = [];

  constructor(config: VoiceManagerConfig) {
    this.config = config;
    if (config.enabled && config.apiKey) {
      this.client = new ElevenLabsClient(config);
    }
  }

  isEnabled(): boolean {
    return this.config.enabled && this.client !== null;
  }

  async speak(text: string, priority: boolean = false): Promise<void> {
    if (!this.isEnabled() || !this.client) {
      return;
    }

    if (priority) {
      // Clear queue and speak immediately
      this.queue = [];
      await this.speakNow(text);
    } else {
      // Add to queue
      this.queue.push(text);
      this.processQueue();
    }
  }

  private async speakNow(text: string): Promise<void> {
    if (!this.client || this.isPlaying) {
      return;
    }

    try {
      this.isPlaying = true;

      if (this.config.streaming) {
        const stream = await this.client.textToSpeechStream({ text });
        await AudioPlayer.playStream(stream);
      } else {
        const audio = await this.client.textToSpeech({ text });
        await AudioPlayer.play(audio);
      }
    } catch (error) {
      console.error(colors.error(`Voice playback error: ${error instanceof Error ? error.message : 'Unknown error'}`));
    } finally {
      this.isPlaying = false;
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isPlaying || this.queue.length === 0) {
      return;
    }

    const text = this.queue.shift();
    if (text) {
      await this.speakNow(text);
      // Process next item in queue
      if (this.queue.length > 0) {
        this.processQueue();
      }
    }
  }

  shouldSpeak(severity: string): boolean {
    if (!this.isEnabled()) {
      return false;
    }

    const threshold = this.config.severityThreshold || 'info';
    const severityLevels = ['info', 'low', 'medium', 'warning', 'high', 'error', 'critical'];
    const thresholdLevels = ['info', 'warning', 'error', 'critical'];
    
    // Map severity to threshold level
    const severityLower = severity.toLowerCase();
    let mappedSeverity = severityLower;
    
    // Map common severity names to threshold levels
    if (severityLower === 'low' || severityLower === 'info') {
      mappedSeverity = 'info';
    } else if (severityLower === 'medium' || severityLower === 'warning') {
      mappedSeverity = 'warning';
    } else if (severityLower === 'high' || severityLower === 'error') {
      mappedSeverity = 'error';
    } else if (severityLower === 'critical') {
      mappedSeverity = 'critical';
    }
    
    const thresholdIndex = thresholdLevels.indexOf(threshold);
    const currentIndex = thresholdLevels.indexOf(mappedSeverity);

    return currentIndex >= thresholdIndex;
  }

  async speakTriage(data: {
    severity: string;
    hypothesis: string;
    confidence: number;
    needsDeepAnalysis?: boolean;
  }): Promise<void> {
    if (!this.shouldSpeak(data.severity)) {
      console.log(colors.muted(`[Voice] Skipping alert (severity: ${data.severity}, threshold: ${this.config.severityThreshold})`));
      return;
    }

    const severityText = data.severity.toUpperCase();
    const confidencePercent = Math.round(data.confidence * 100);
    
    let message = `${severityText} alert. ${data.hypothesis}. Confidence: ${confidencePercent} percent.`;
    
    if (data.needsDeepAnalysis) {
      message += ' Escalating to deep analysis.';
    }

    console.log(colors.accent(`[Voice] Speaking: ${message.substring(0, 50)}...`));
    await this.speak(message, data.severity.toLowerCase() === 'critical');
  }

  async speakDeepAnalysis(data: {
    rootCause: string;
    hasPatch: boolean;
  }): Promise<void> {
    let message = `Root cause identified: ${data.rootCause}.`;
    
    if (data.hasPatch) {
      message += ' Patch generated and ready for review.';
    }

    console.log(colors.accent(`[Voice] Speaking: ${message.substring(0, 50)}...`));
    await this.speak(message);
  }

  async speakError(error: string): Promise<void> {
    await this.speak(`Error: ${error}`, true);
  }

  async speakSuccess(message: string): Promise<void> {
    await this.speak(message);
  }

  clearQueue(): void {
    this.queue = [];
  }

  updateConfig(config: Partial<VoiceManagerConfig>): void {
    this.config = { ...this.config, ...config };
    
    if (config.apiKey || config.model || config.voiceId) {
      this.client = new ElevenLabsClient({
        apiKey: config.apiKey || this.config.apiKey,
        model: config.model || this.config.model,
        voiceId: config.voiceId || this.config.voiceId,
      });
    }
  }
}
