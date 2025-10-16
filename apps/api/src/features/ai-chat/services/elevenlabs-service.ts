/**
 * ElevenLabs Text-to-Speech Service
 *
 * Integrates ElevenLabs API for high-quality voice synthesis.
 * Converts agent text responses to natural-sounding Spanish audio.
 *
 * Features:
 * - Streaming audio generation
 * - Configurable voice selection
 * - Error handling and fallbacks
 * - Base64 encoding for WebSocket transmission
 */

import { Readable } from 'stream';

// ElevenLabs SDK
// @ts-ignore - ElevenLabs types may not be perfect
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export interface ElevenLabsConfig {
  apiKey: string;
  voiceId?: string;
  modelId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
}

export class ElevenLabsService {
  private client: any;
  private defaultVoiceId: string;
  private modelId: string;
  private voiceSettings: {
    stability: number;
    similarityBoost: number;
    style: number;
    useSpeakerBoost: boolean;
  };

  constructor(config: ElevenLabsConfig) {
    if (!config.apiKey) {
      throw new Error('ELEVENLABS_API_KEY no está configurada');
    }

    this.client = new ElevenLabsClient({
      apiKey: config.apiKey,
    });

    // Voice ID - Rachel (default sweet Spanish female voice)
    // You can find voice IDs at: https://elevenlabs.io/app/voice-lab
    this.defaultVoiceId = config.voiceId || '21m00Tcm4TlvDq8ikWAM'; // Rachel (English default, but works well with Spanish)

    // Model ID - multilingual v2 for Spanish support
    this.modelId = config.modelId || 'eleven_multilingual_v2';

    // Voice settings for natural, warm Spanish speech
    this.voiceSettings = {
      stability: config.stability ?? 0.5, // 0.5 for balanced stability
      similarityBoost: config.similarityBoost ?? 0.75, // Higher for more natural voice
      style: config.style ?? 0.4, // Style exaggeration (0-1)
      useSpeakerBoost: config.useSpeakerBoost ?? true, // Enhance speaker clarity
    };

    console.log('✅ ElevenLabs Service initialized');
    console.log(`   - Default Voice ID: ${this.defaultVoiceId}`);
    console.log(`   - Model: ${this.modelId}`);
  }

  /**
   * Converts text to speech and returns audio buffer
   * @param text - Text to convert to speech
   * @param voiceId - Optional voice ID (uses default if not provided)
   * @returns Audio buffer (MP3 format)
   */
  async textToSpeech(text: string, voiceId?: string): Promise<Buffer> {
    try {
      if (!text || text.trim().length === 0) {
        throw new Error('Text is required for TTS');
      }

      const selectedVoiceId = voiceId || this.defaultVoiceId;

      console.log('🎙️ ElevenLabs: Generating speech...');
      console.log(`   Text: "${text.substring(0, 50)}..."`);
      console.log(`   Voice: ${selectedVoiceId}`);

      // Generate speech with streaming
      const audioStream = await this.client.textToSpeech.convert(selectedVoiceId, {
        text: text,
        model_id: this.modelId,
        voice_settings: {
          stability: this.voiceSettings.stability,
          similarity_boost: this.voiceSettings.similarityBoost,
          style: this.voiceSettings.style,
          use_speaker_boost: this.voiceSettings.useSpeakerBoost,
        },
      });

      // Convert stream to buffer
      const chunks: Buffer[] = [];

      for await (const chunk of audioStream) {
        chunks.push(Buffer.from(chunk));
      }

      const audioBuffer = Buffer.concat(chunks);

      console.log(`✅ ElevenLabs: Audio generated (${audioBuffer.length} bytes)`);

      return audioBuffer;
    } catch (error) {
      console.error('❌ ElevenLabs error:', error);

      if (error instanceof Error) {
        throw new Error(`ElevenLabs TTS failed: ${error.message}`);
      }

      throw new Error('ElevenLabs TTS failed: Unknown error');
    }
  }

  /**
   * Converts text to speech and returns base64-encoded audio
   * Useful for JSON transmission over WebSocket
   * @param text - Text to convert to speech
   * @param voiceId - Optional voice ID (uses default if not provided)
   * @returns Base64-encoded audio (MP3)
   */
  async textToSpeechBase64(text: string, voiceId?: string): Promise<string> {
    try {
      const audioBuffer = await this.textToSpeech(text, voiceId);
      const base64Audio = audioBuffer.toString('base64');

      console.log(`✅ Audio converted to base64 (${base64Audio.length} chars)`);

      return base64Audio;
    } catch (error) {
      console.error('❌ Error converting to base64:', error);
      throw error;
    }
  }

  /**
   * Get available voices from ElevenLabs
   * @returns List of available voices
   */
  async getVoices(): Promise<any[]> {
    try {
      const response = await this.client.voices.getAll();
      return response.voices || [];
    } catch (error) {
      console.error('❌ Error fetching voices:', error);
      return [];
    }
  }

  /**
   * Updates voice settings
   * @param settings - New voice settings
   */
  updateVoiceSettings(settings: Partial<typeof this.voiceSettings>): void {
    this.voiceSettings = {
      ...this.voiceSettings,
      ...settings,
    };

    console.log('✅ Voice settings updated:', this.voiceSettings);
  }

  /**
   * Changes the default voice
   * @param voiceId - New default voice ID
   */
  setDefaultVoice(voiceId: string): void {
    this.defaultVoiceId = voiceId;
    console.log(`✅ Default voice changed to: ${voiceId}`);
  }

  /**
   * Gets the current default voice ID
   * @returns Current default voice ID
   */
  getDefaultVoiceId(): string {
    return this.defaultVoiceId;
  }
}

// Export singleton instance
let elevenLabsInstance: ElevenLabsService | null = null;

/**
 * Gets or creates the ElevenLabs service instance
 */
export function getElevenLabsService(): ElevenLabsService {
  if (!elevenLabsInstance) {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      throw new Error(
        'ELEVENLABS_API_KEY no está configurada en las variables de entorno'
      );
    }

    elevenLabsInstance = new ElevenLabsService({
      apiKey,
      voiceId: process.env.ELEVENLABS_VOICE_ID,
      modelId: process.env.ELEVENLABS_MODEL_ID,
    });
  }

  return elevenLabsInstance;
}
