/**
 * AI Chat Service
 *
 * Main service for managing AI chat conversations.
 * Handles greetings, message processing, and conversation history.
 */

import { createOpenAIService } from './services/openai-service';
import type { OpenAIService } from './services/openai-service';

export class AIChatService {
  private greeted = false;
  private openaiService: OpenAIService;
  private sessionId: string;

  constructor() {
    // Initialize OpenAI Service
    this.openaiService = createOpenAIService();
    this.sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log(`🤖 AI Chat Service initialized | Session: ${this.sessionId}`);
  }

  /**
   * Handles incoming user message and generates response
   * @param input User's message
   * @returns Assistant's response
   */
  async handleMessage(input: string): Promise<string> {
    const startTime = Date.now();
    const message = input.toLowerCase().trim();

    try {
      // Handle initial greeting (first interaction)
      if (!this.greeted && this.isGreeting(message)) {
        this.greeted = true;
        const response = this.getGreetingResponse();
        const latency = Date.now() - startTime;
        console.log(`✅ Greeting response sent (${latency}ms)`);
        return response;
      }

      // Process message with OpenAI (with automatic function calling)
      const toolStartTime = Date.now();
      const response = await this.openaiService.processMessage(
        input,
        this.sessionId
      );
      const toolDuration = Date.now() - toolStartTime;

      console.log(
        `✅ OpenAI response generated (${toolDuration}ms) | Length: ${response.length} chars`
      );

      const latency = Date.now() - startTime;
      console.log(`⏱️ Total latency: ${latency}ms`);

      return response;
    } catch (error) {
      console.error('❌ Error in AIChatService:', error);

      // Fallback response on error
      const errorResponse =
        'Disculpa, tuve un problema al procesar tu pregunta. ¿Podrías reformularla o preguntar algo diferente?';
      const latency = Date.now() - startTime;
      console.log(`⚠️ Error response sent (${latency}ms)`);
      return errorResponse;
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
    console.log(`🔄 History cleared for session ${this.sessionId}`);
  }

  /**
   * Gets the current session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }
}
