// server/agent.ts
import { createOpenAIService } from "./services/openai-service.js";
import { globalTracer } from "./tracing/tracer.js";

export class RealtimeAgent {
  private greeted = false;
  private openaiService: ReturnType<typeof createOpenAIService>;
  private sessionId: string;

  constructor() {
    // Inicializar OpenAI Service
    this.openaiService = createOpenAIService();
    this.sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log(`🤖 Agente inicializado con OpenAI | Sesión: ${this.sessionId}`);
  }

  async handleMessage(input: string): Promise<string> {
    const startTime = Date.now();
    const message = input.toLowerCase().trim();

    // Log input
    globalTracer.logInput(input);

    try {
      // Saludos iniciales (primera interacción)
      if (!this.greeted && this.isGreeting(message)) {
        this.greeted = true;
        globalTracer.logIntent('greeting');
        const response = this.getGreetingResponse();
        const latency = Date.now() - startTime;
        globalTracer.logOutput(response, latency);
        return response;
      }

      // Procesar mensaje con OpenAI (con function calling automático)
      globalTracer.logIntent('openai_processing', 1.0);

      const toolStartTime = Date.now();
      const response = await this.openaiService.processMessage(input, this.sessionId);
      const toolDuration = Date.now() - toolStartTime;

      globalTracer.logToolCall(
        'openaiService.processMessage',
        { query: input, sessionId: this.sessionId },
        { responseLength: response.length },
        toolDuration
      );

      const latency = Date.now() - startTime;
      globalTracer.logOutput(response, latency);

      return response;

    } catch (error) {
      globalTracer.logError(
        error instanceof Error ? error : new Error(String(error)),
        { query: input }
      );
      console.error('❌ Error en RealtimeAgent:', error);

      // Respuesta de fallback en caso de error
      const errorResponse =
        "Disculpa, tuve un problema al procesar tu pregunta. ¿Podrías reformularla o preguntar algo diferente?";
      const latency = Date.now() - startTime;
      globalTracer.logOutput(errorResponse, latency);
      return errorResponse;
    }
  }

  /**
   * Detecta si el mensaje es un saludo
   */
  private isGreeting(message: string): boolean {
    const greetings = [
      'hola', 'hi', 'hello', 'hey', 'buenos días', 'buenas tardes',
      'buenas noches', 'saludos', 'qué tal', 'como estas', 'holi'
    ];
    return greetings.some(greeting => message.includes(greeting));
  }

  /**
   * Retorna un saludo inicial variado
   */
  private getGreetingResponse(): string {
    const responses = [
      "¡Hola! Soy tu asistente especializado en estrategias de adopción de inteligencia artificial para empresas. Puedo ayudarte con información sobre implementación de IA, capacitación de equipos, automatización de procesos y mejores prácticas. ¿En qué puedo ayudarte hoy?",

      "¡Saludos! Me da gusto conocerte. Estoy aquí para ayudarte con estrategias de IA empresarial, desde los pilares de implementación hasta casos de uso específicos. ¿Qué te gustaría saber?",

      "¡Hola! Bienvenido. Soy un asistente conversacional experto en estrategias de adopción de IA. Puedo contarte sobre capacitación escalonada, automatización de alto impacto, métricas de éxito y mucho más. ¿Cómo puedo asistirte?",

      "¡Qué tal! Me alegra verte. Estoy listo para ayudarte con información detallada sobre transformación digital e implementación de IA en empresas. ¿Sobre qué tema específico te gustaría conversar?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Limpia el historial de conversación para esta sesión
   */
  clearHistory(): void {
    this.openaiService.clearHistory(this.sessionId);
    this.greeted = false;
    console.log(`🔄 Historial limpiado para sesión ${this.sessionId}`);
  }

  /**
   * Obtiene el ID de la sesión actual
   */
  getSessionId(): string {
    return this.sessionId;
  }
}
