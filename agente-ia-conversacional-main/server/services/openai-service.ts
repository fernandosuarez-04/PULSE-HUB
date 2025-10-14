// server/services/openai-service.ts
import OpenAI from 'openai';
import type { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources/chat/completions';
import { searchInCoda } from '../tools/coda.js';
import type { ConversationMessage, OpenAIConfig } from '../types/conversation.js';

/**
 * System prompt optimizado para el asistente de estrategias de IA
 */
const SYSTEM_PROMPT = `Eres un asistente experto en estrategias de adopción de inteligencia artificial para empresas. Tu conocimiento proviene de una base de datos especializada que contiene información sobre:

- Pilares de implementación de IA (IA para Todos, IA en el Día a Día, Automatización de Alto Impacto)
- Estrategias de capacitación escalonada por niveles (directivos, mandos medios, operativos)
- Casos de uso empresariales y mejores prácticas
- Métricas y KPIs de éxito para proyectos de IA
- Roadmaps y fases de implementación
- Análisis de riesgo y mitigación

INSTRUCCIONES IMPORTANTES:
1. SIEMPRE basa tus respuestas en la información de la base de conocimiento
2. Si necesitas información específica, usa la función searchInCoda para buscarla
3. Sé conciso pero completo (máximo 200-250 palabras por respuesta)
4. Usa formato conversacional y natural en español
5. Si no encuentras información específica en la base, reconócelo honestamente
6. Ofrece seguimiento preguntando si necesitan más detalles o aclaraciones
7. Estructura tus respuestas con:
   - Respuesta directa a la pregunta
   - Ejemplos concretos cuando sea relevante
   - Pregunta de seguimiento para profundizar

Tu objetivo es ayudar a empresas a implementar IA de manera exitosa y estratégica.`;

/**
 * Definición de las tools (function calling) disponibles para el asistente
 */
const TOOLS: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'searchInCoda',
      description: 'Busca información sobre estrategias de adopción de IA, capacitación, automatización y mejores prácticas en la base de conocimiento. Usa esta función cuando necesites información específica para responder una pregunta del usuario.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'La pregunta o tema a buscar en la base de conocimiento. Reformula la pregunta del usuario para maximizar la relevancia de los resultados. Ejemplos: "capacitación escalonada IA", "métricas éxito implementación IA", "pilares adopción inteligencia artificial"'
          }
        },
        required: ['query']
      }
    }
  }
];

/**
 * Servicio de OpenAI para gestionar conversaciones inteligentes
 * con function calling y memoria conversacional
 */
export class OpenAIService {
  private client: OpenAI;
  private config: OpenAIConfig;
  private conversationHistory: Map<string, ConversationMessage[]>;
  private maxHistoryLength: number = 10; // Últimos 10 mensajes

  constructor(config: OpenAIConfig) {
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.apiKey,
    });
    this.conversationHistory = new Map();

    console.log('✅ OpenAI Service inicializado con modelo:', config.model);
  }

  /**
   * Procesa un mensaje del usuario y genera una respuesta inteligente
   * @param userMessage Mensaje del usuario
   * @param sessionId ID de la sesión para mantener contexto
   * @returns Respuesta generada por el asistente
   */
  async processMessage(userMessage: string, sessionId: string = 'default'): Promise<string> {
    try {
      // Obtener o inicializar historial de conversación
      const history = this.getConversationHistory(sessionId);

      // Agregar mensaje del usuario al historial
      const userMsg: ConversationMessage = {
        role: 'user',
        content: userMessage,
        timestamp: Date.now()
      };
      history.push(userMsg);

      // Preparar mensajes para OpenAI
      const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      // Llamar a OpenAI con function calling habilitado
      const response = await this.client.chat.completions.create({
        model: this.config.model,
        messages: messages,
        tools: TOOLS,
        tool_choice: 'auto', // OpenAI decide si necesita usar tools
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature ?? 0.7,
      });

      const choice = response.choices[0];

      // Si OpenAI quiere ejecutar una función
      if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls) {
        return await this.handleToolCalls(choice.message, messages, sessionId);
      }

      // Respuesta directa sin tool calls
      const assistantResponse = choice.message.content || 'Lo siento, no pude generar una respuesta.';

      // Agregar respuesta del asistente al historial
      history.push({
        role: 'assistant',
        content: assistantResponse,
        timestamp: Date.now()
      });

      // Guardar historial actualizado
      this.updateConversationHistory(sessionId, history);

      return assistantResponse;

    } catch (error) {
      console.error('❌ Error en OpenAI Service:', error);
      throw new Error(`Error procesando mensaje: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Maneja las llamadas a funciones (tools) solicitadas por OpenAI
   */
  private async handleToolCalls(
    assistantMessage: any,
    messages: ChatCompletionMessageParam[],
    sessionId: string
  ): Promise<string> {
    // Agregar mensaje del asistente con tool calls al contexto
    messages.push(assistantMessage);

    // Ejecutar cada tool call
    for (const toolCall of assistantMessage.tool_calls) {
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);

      console.log(`🔧 OpenAI solicitó tool: ${functionName} con args:`, functionArgs);

      let functionResponse: string;

      // Ejecutar la función correspondiente
      if (functionName === 'searchInCoda') {
        const searchResult = await searchInCoda(functionArgs.query);
        functionResponse = searchResult || 'No se encontró información relevante en la base de conocimiento.';
        console.log(`📊 Resultado de búsqueda en Coda: ${searchResult ? 'Encontrado' : 'No encontrado'} (${searchResult?.length || 0} chars)`);
      } else {
        functionResponse = `Función ${functionName} no implementada.`;
      }

      // Agregar resultado de la función al contexto
      messages.push({
        role: 'tool',
        content: functionResponse,
        tool_call_id: toolCall.id
      });
    }

    // Llamar nuevamente a OpenAI con los resultados de las funciones
    const secondResponse = await this.client.chat.completions.create({
      model: this.config.model,
      messages: messages,
      max_tokens: this.config.maxTokens,
      temperature: this.config.temperature ?? 0.7,
    });

    const finalResponse = secondResponse.choices[0].message.content ||
      'Lo siento, no pude generar una respuesta con la información encontrada.';

    // Actualizar historial con la respuesta final
    const history = this.getConversationHistory(sessionId);
    history.push({
      role: 'assistant',
      content: finalResponse,
      timestamp: Date.now()
    });
    this.updateConversationHistory(sessionId, history);

    return finalResponse;
  }

  /**
   * Obtiene el historial de conversación para una sesión
   */
  private getConversationHistory(sessionId: string): ConversationMessage[] {
    if (!this.conversationHistory.has(sessionId)) {
      this.conversationHistory.set(sessionId, []);
    }
    return this.conversationHistory.get(sessionId)!;
  }

  /**
   * Actualiza el historial y limita su tamaño
   */
  private updateConversationHistory(sessionId: string, history: ConversationMessage[]): void {
    // Mantener solo los últimos N mensajes para no exceder límites de contexto
    if (history.length > this.maxHistoryLength) {
      history.splice(0, history.length - this.maxHistoryLength);
    }
    this.conversationHistory.set(sessionId, history);
  }

  /**
   * Limpia el historial de una sesión específica
   */
  clearHistory(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
    console.log(`🗑️ Historial limpiado para sesión: ${sessionId}`);
  }

  /**
   * Limpia todo el historial
   */
  clearAllHistory(): void {
    this.conversationHistory.clear();
    console.log('🗑️ Todo el historial de conversaciones limpiado');
  }
}

/**
 * Crea una instancia del servicio OpenAI desde variables de entorno
 */
export function createOpenAIService(): OpenAIService {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS || '1000', 10);

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY no está configurada en las variables de entorno');
  }

  const config: OpenAIConfig = {
    apiKey,
    model,
    maxTokens,
    temperature: 0.7
  };

  return new OpenAIService(config);
}
