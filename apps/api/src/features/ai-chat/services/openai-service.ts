/**
 * OpenAI Service for AI Chat Feature
 *
 * This service manages conversations with OpenAI's GPT models using the Chat Completions API
 * with Function Calling. It maintains conversation history and automatically calls tools when needed.
 *
 * Environment Variables Required:
 * - OPENAI_API_KEY: OpenAI API key from https://platform.openai.com/api-keys
 * - OPENAI_MODEL: Model to use (default: gpt-4o-mini)
 * - OPENAI_MAX_TOKENS: Max tokens per response (default: 1000)
 */

import OpenAI from 'openai';
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources/chat/completions';
import { searchInCoda } from '../tools';
import type { ConversationMessage, OpenAIConfig } from '../ai-chat.types';

/**
 * System prompt for the AI assistant
 * Defines the assistant's expertise, behavior, and response format
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
 * Function calling tools available to the assistant
 */
const TOOLS: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'searchInCoda',
      description:
        'Busca información sobre estrategias de adopción de IA, capacitación, automatización y mejores prácticas en la base de conocimiento. Usa esta función cuando necesites información específica para responder una pregunta del usuario.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description:
              'La pregunta o tema a buscar en la base de conocimiento. Reformula la pregunta del usuario para maximizar la relevancia de los resultados. Ejemplos: "capacitación escalonada IA", "métricas éxito implementación IA", "pilares adopción inteligencia artificial"',
          },
        },
        required: ['query'],
      },
    },
  },
];

/**
 * OpenAI Service Class
 * Manages conversations with OpenAI GPT models including function calling and conversation history
 */
export class OpenAIService {
  private client: OpenAI;
  private config: OpenAIConfig;
  private conversationHistory: Map<string, ConversationMessage[]>;
  private maxHistoryLength: number = 10; // Keep last 10 messages per session

  constructor(config: OpenAIConfig) {
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.apiKey,
    });
    this.conversationHistory = new Map();

    console.log('✅ OpenAI Service initialized with model:', config.model);
  }

  /**
   * Processes a user message and generates an intelligent response
   * @param userMessage User's message text
   * @param sessionId Session ID to maintain conversation context
   * @returns Assistant's response
   */
  async processMessage(
    userMessage: string,
    sessionId: string = 'default'
  ): Promise<string> {
    try {
      // Get or initialize conversation history
      const history = this.getConversationHistory(sessionId);

      // Add user message to history
      const userMsg: ConversationMessage = {
        role: 'user',
        content: userMessage,
        timestamp: Date.now(),
      };
      history.push(userMsg);

      // Prepare messages for OpenAI
      const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.map((msg) => {
          // Build message based on role to satisfy TypeScript types
          if (msg.role === 'tool') {
            return {
              role: 'tool' as const,
              content: msg.content,
              tool_call_id: msg.tool_call_id!,
            };
          } else if (msg.role === 'assistant') {
            return {
              role: 'assistant' as const,
              content: msg.content,
            };
          } else if (msg.role === 'user') {
            return {
              role: 'user' as const,
              content: msg.content,
            };
          } else {
            return {
              role: 'system' as const,
              content: msg.content,
            };
          }
        }),
      ];

      // Call OpenAI with function calling enabled
      const response = await this.client.chat.completions.create({
        model: this.config.model,
        messages: messages as any, // Cast to any to handle tool role
        tools: TOOLS,
        tool_choice: 'auto', // OpenAI decides when to use tools
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature ?? 0.7,
      });

      const choice = response.choices[0];

      // If OpenAI wants to execute a function
      if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls) {
        return await this.handleToolCalls(choice.message, messages, sessionId);
      }

      // Direct response without tool calls
      const assistantResponse =
        choice.message.content || 'Lo siento, no pude generar una respuesta.';

      // Add assistant response to history
      history.push({
        role: 'assistant',
        content: assistantResponse,
        timestamp: Date.now(),
      });

      // Save updated history
      this.updateConversationHistory(sessionId, history);

      return assistantResponse;
    } catch (error) {
      console.error('❌ Error in OpenAI Service:', error);
      throw new Error(
        `Error processing message: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Handles tool calls requested by OpenAI
   * @param assistantMessage Message with tool calls
   * @param messages Current conversation messages
   * @param sessionId Session identifier
   * @returns Final assistant response after tool execution
   */
  private async handleToolCalls(
    assistantMessage: any,
    messages: ChatCompletionMessageParam[],
    sessionId: string
  ): Promise<string> {
    // Add assistant message with tool calls to context
    messages.push(assistantMessage);

    // Execute each tool call
    for (const toolCall of assistantMessage.tool_calls) {
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);

      console.log(
        `🔧 OpenAI requested tool: ${functionName} with args:`,
        functionArgs
      );

      let functionResponse: string;

      // Execute the corresponding function
      if (functionName === 'searchInCoda') {
        const searchResult = await searchInCoda(functionArgs.query);
        functionResponse =
          searchResult ||
          'No se encontró información relevante en la base de conocimiento.';
        console.log(
          `📊 Search result from Coda: ${searchResult ? 'Found' : 'Not found'} (${searchResult?.length || 0} chars)`
        );
      } else {
        functionResponse = `Function ${functionName} not implemented.`;
      }

      // Add function result to context
      messages.push({
        role: 'tool',
        content: functionResponse,
        tool_call_id: toolCall.id,
      });
    }

    // Call OpenAI again with function results
    const secondResponse = await this.client.chat.completions.create({
      model: this.config.model,
      messages: messages as any, // Cast to any to handle tool role
      max_tokens: this.config.maxTokens,
      temperature: this.config.temperature ?? 0.7,
    });

    const finalResponse =
      secondResponse.choices[0].message.content ||
      'Lo siento, no pude generar una respuesta con la información encontrada.';

    // Update history with final response
    const history = this.getConversationHistory(sessionId);
    history.push({
      role: 'assistant',
      content: finalResponse,
      timestamp: Date.now(),
    });
    this.updateConversationHistory(sessionId, history);

    return finalResponse;
  }

  /**
   * Gets conversation history for a session
   */
  private getConversationHistory(sessionId: string): ConversationMessage[] {
    if (!this.conversationHistory.has(sessionId)) {
      this.conversationHistory.set(sessionId, []);
    }
    return this.conversationHistory.get(sessionId)!;
  }

  /**
   * Updates conversation history and limits its size
   */
  private updateConversationHistory(
    sessionId: string,
    history: ConversationMessage[]
  ): void {
    // Keep only the last N messages to avoid exceeding context limits
    if (history.length > this.maxHistoryLength) {
      history.splice(0, history.length - this.maxHistoryLength);
    }
    this.conversationHistory.set(sessionId, history);
  }

  /**
   * Clears conversation history for a specific session
   */
  clearHistory(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
    console.log(`🗑️ History cleared for session: ${sessionId}`);
  }

  /**
   * Clears all conversation history
   */
  clearAllHistory(): void {
    this.conversationHistory.clear();
    console.log('🗑️ All conversation history cleared');
  }
}

/**
 * Creates an OpenAI Service instance from environment variables
 * @returns Configured OpenAI Service instance
 */
export function createOpenAIService(): OpenAIService {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS || '1000', 10);

  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY is not configured in environment variables'
    );
  }

  const config: OpenAIConfig = {
    apiKey,
    model,
    maxTokens,
    temperature: 0.7,
  };

  return new OpenAIService(config);
}
