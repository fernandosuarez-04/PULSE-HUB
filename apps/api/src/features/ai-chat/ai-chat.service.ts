/**
 * AI Chat Service
 *
 * Main service for managing AI chat conversations.
 * Handles greetings, message processing, conversation history, and voice synthesis.
 */

import { createOpenAIService } from './services/openai-service';
import type { OpenAIService } from './services/openai-service';
import { getElevenLabsService } from './services/elevenlabs-service';
import type { ElevenLabsService } from './services/elevenlabs-service';

export interface ChatResponse {
  text: string;
  audio?: string; // Base64-encoded audio
}

export class AIChatService {
  private greeted = false;
  private openaiService: OpenAIService;
  private elevenLabsService: ElevenLabsService | null = null;
  private sessionId: string;

  constructor() {
    // Initialize OpenAI Service
    this.openaiService = createOpenAIService();
    this.sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Initialize ElevenLabs Service (optional - falls back to text-only if not configured)
    try {
      this.elevenLabsService = getElevenLabsService();
      // console.log(`🎙️ ElevenLabs enabled for session ${this.sessionId}`);
    } catch (error) {
      console.warn('⚠️ ElevenLabs not configured, audio generation disabled');
      this.elevenLabsService = null;
    }

    // console.log(`🤖 AI Chat Service initialized | Session: ${this.sessionId}`);
  }

  /**
   * Handles incoming user message and generates response
   * @param input User's message
   * @returns Assistant's response (text only, for backward compatibility)
   */
  async handleMessage(input: string): Promise<string> {
    const response = await this.handleMessageWithAudio(input);
    return response.text;
  }

  /**
   * Handles incoming user message and generates response with audio
   * @param input User's message
   * @returns Assistant's response with text and optional audio
   */
  async handleMessageWithAudio(input: string): Promise<ChatResponse> {
    const startTime = Date.now();
    const message = input.toLowerCase().trim();

    try {
      // Handle initial greeting (first interaction)
      if (!this.greeted && this.isGreeting(message)) {
        this.greeted = true;
        const responseText = this.getGreetingResponse();
        const latency = Date.now() - startTime;
        // console.log(`✅ Greeting response sent (${latency}ms)`);

        // Generate audio for greeting if ElevenLabs is available
        const audio = await this.generateAudio(responseText);

        return {
          text: responseText,
          audio,
        };
      }

      // Process message with OpenAI (with automatic function calling)
      const toolStartTime = Date.now();
      const responseText = await this.openaiService.processMessage(
        input,
        this.sessionId
      );
      const toolDuration = Date.now() - toolStartTime;

      // console.log(
      //   `✅ OpenAI response generated (${toolDuration}ms) | Length: ${responseText.length} chars`
      // );

      // Generate audio for response if ElevenLabs is available
      const audio = await this.generateAudio(responseText);

      const latency = Date.now() - startTime;
      // console.log(`⏱️ Total latency: ${latency}ms`);

      return {
        text: responseText,
        audio,
      };
    } catch (error) {
      // console.error('❌ Error in AIChatService:', error);

      // Fallback response on error
      const errorResponse =
        'Disculpa, tuve un problema al procesar tu pregunta. ¿Podrías reformularla o preguntar algo diferente?';
      const latency = Date.now() - startTime;
      // console.log(`⚠️ Error response sent (${latency}ms)`);

      const audio = await this.generateAudio(errorResponse);

      return {
        text: errorResponse,
        audio,
      };
    }
  }

  /**
   * Generates audio from text using ElevenLabs
   * @param text - Text to convert to speech
   * @returns Base64-encoded audio or undefined if not available
   */
  private async generateAudio(text: string): Promise<string | undefined> {
    if (!this.elevenLabsService) {
      return undefined;
    }

    try {
      const audioStartTime = Date.now();
      const audioBase64 = await this.elevenLabsService.textToSpeechBase64(text);
      const audioDuration = Date.now() - audioStartTime;
      // console.log(`🎙️ Audio generated (${audioDuration}ms)`);
      return audioBase64;
    } catch (error) {
      console.error('❌ Error generating audio:', error);
      // Return undefined to fall back to text-only mode
      return undefined;
    }
  }

  /**
   * Detects if message is a greeting
   */
  private isGreeting(message: string): boolean {
    const greetings = [
      'hola',
      'hi',
      'hello',
      'hey',
      'buenos días',
      'buenas tardes',
      'buenas noches',
      'saludos',
      'qué tal',
      'como estas',
      'holi',
    ];
    return greetings.some((greeting) => message.includes(greeting));
  }

  /**
   * Returns a random greeting response
   */
  private getGreetingResponse(): string {
    const responses = [
      '¡Hola! 👋 Soy tu asistente especializado en estrategias de adopción de inteligencia artificial para empresas. Puedo ayudarte con información sobre implementación de IA, capacitación de equipos, automatización de procesos y mejores prácticas. ¿En qué puedo ayudarte hoy?',

      '¡Saludos! 🤖 Me da gusto conocerte. Estoy aquí para ayudarte con estrategias de IA empresarial, desde los pilares de implementación hasta casos de uso específicos. ¿Qué te gustaría saber?',

      '¡Hola! ✨ Bienvenido. Soy un asistente conversacional experto en estrategias de adopción de IA. Puedo contarte sobre capacitación escalonada, automatización de alto impacto, métricas de éxito y mucho más. ¿Cómo puedo asistirte?',

      '¡Qué tal! 🎯 Me alegra verte. Estoy listo para ayudarte con información detallada sobre transformación digital e implementación de IA en empresas. ¿Sobre qué tema específico te gustaría conversar?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Clears conversation history for the current session
   */
  clearHistory(): void {
    this.openaiService.clearHistory(this.sessionId);
    this.greeted = false;
    // console.log(`🔄 History cleared for session ${this.sessionId}`);
  }

  /**
   * Gets the current session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }
}
