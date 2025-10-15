/**
 * Chat Utilities - Shared between Next.js API Route and Netlify Functions
 * 
 * Shared utilities for AI Chat including:
 * - Coda API integration (searchInCoda)
 * - Greeting detection and responses
 * - OpenAI processing with function calling
 */

import OpenAI from 'openai';
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources/chat/completions';

// ===== CODA API INTEGRATION =====

interface CodaRow {
  id: string;
  type: string;
  href: string;
  name: string;
  index: number;
  createdAt: string;
  updatedAt: string;
  browserLink: string;
  values: Record<string, any>;
}

interface TableRowsResponse {
  items: CodaRow[];
  href: string;
  nextPageToken?: string;
  nextPageLink?: string;
}

const CODA_BASE_URL = 'https://coda.io/apis/v1';

/**
 * Searches for relevant content in the Coda table based on a query
 * @param query User's search query
 * @returns Best matching content or empty string if not found
 */
export async function searchInCoda(query: string): Promise<string> {
  const apiKey = process.env.CODA_API_KEY;
  const docId = process.env.CODA_DOC_ID;
  const tableId = process.env.CODA_TABLE_ID;

  if (!apiKey || !docId || !tableId) {
    console.warn('Coda environment variables not configured');
    return '';
  }

  try {
    const url = `${CODA_BASE_URL}/docs/${docId}/tables/${tableId}/rows?limit=10&useColumnNames=true`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Coda API error:', response.status);
      return '';
    }

    const data = (await response.json()) as TableRowsResponse;
    const rows = data.items;

    if (rows.length === 0) {
      return '';
    }

    // Convert query to lowercase and extract keywords
    const keywords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3);

    // Search for the best match in all rows
    let bestMatch = '';
    let bestScore = 0;

    for (const row of rows) {
      const rowText = JSON.stringify(row.values).toLowerCase();

      // Count keyword matches
      let score = 0;
      for (const keyword of keywords) {
        const matches = (rowText.match(new RegExp(keyword, 'g')) || []).length;
        score += matches;
      }

      // If we found a better match, save it
      if (score > bestScore) {
        bestScore = score;
        // Get the first text value found in the row
        const firstValue = Object.values(row.values)[0];
        if (typeof firstValue === 'string') {
          bestMatch = firstValue;
        }
      }
    }

    if (bestMatch && bestScore > 0) {
      // Truncate if too long (max 2000 characters for context)
      if (bestMatch.length > 2000) {
        const firstKeyword = keywords[0];
        const keywordIndex = bestMatch.toLowerCase().indexOf(firstKeyword);

        if (keywordIndex !== -1) {
          const start = Math.max(0, keywordIndex - 500);
          const end = Math.min(bestMatch.length, keywordIndex + 1500);
          return '...' + bestMatch.slice(start, end) + '...';
        }

        return bestMatch.slice(0, 2000) + '...';
      }

      return bestMatch;
    }

    return '';
  } catch (error) {
    console.error('Error searching in Coda:', error);
    return '';
  }
}

// ===== GREETING DETECTION =====

/**
 * Detects if message is a greeting
 */
export function isGreeting(message: string): boolean {
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
  const messageLower = message.toLowerCase().trim();
  return greetings.some((greeting) => messageLower.includes(greeting));
}

/**
 * Returns a random greeting response
 */
export function getGreetingResponse(): string {
  const responses = [
    '¡Hola! 👋 Soy tu asistente especializado en estrategias de adopción de inteligencia artificial para empresas. Puedo ayudarte con información sobre implementación de IA, capacitación de equipos, automatización de procesos y mejores prácticas. ¿En qué puedo ayudarte hoy?',

    '¡Saludos! 🤖 Me da gusto conocerte. Estoy aquí para ayudarte con estrategias de IA empresarial, desde los pilares de implementación hasta casos de uso específicos. ¿Qué te gustaría saber?',

    '¡Hola! ✨ Bienvenido. Soy un asistente conversacional experto en estrategias de adopción de IA. Puedo contarte sobre capacitación escalonada, automatización de alto impacto, métricas de éxito y mucho más. ¿Cómo puedo asistirte?',

    '¡Qué tal! 🎯 Me alegra verte. Estoy listo para ayudarte con información detallada sobre transformación digital e implementación de IA en empresas. ¿Sobre qué tema específico te gustaría conversar?',
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// ===== OPENAI PROCESSING =====

/**
 * System prompt for the AI assistant
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
 * Processes a message with OpenAI including function calling
 * @param userMessage User's message
 * @param conversationHistory Previous messages in the conversation
 * @returns Assistant's response
 */
export async function processWithOpenAI(
  userMessage: string,
  conversationHistory: ChatCompletionMessageParam[] = []
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS || '1000', 10);

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const openai = new OpenAI({ apiKey });

  // Build messages array
  const messages: ChatCompletionMessageParam[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ];

  try {
    // First OpenAI call
    let response = await openai.chat.completions.create({
      model,
      messages,
      tools: TOOLS,
      tool_choice: 'auto',
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    let responseMessage = response.choices[0].message;

    // Check if the model wants to call a function
    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      // Add assistant's response to messages
      messages.push(responseMessage);

      // Process each tool call
      for (const toolCall of responseMessage.tool_calls) {
        if (toolCall.function.name === 'searchInCoda') {
          const args = JSON.parse(toolCall.function.arguments);
          const searchResult = await searchInCoda(args.query);

          // Add function response to messages
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: searchResult || 'No se encontró información relevante.',
          });
        }
      }

      // Second OpenAI call with function results
      response = await openai.chat.completions.create({
        model,
        messages,
        max_tokens: maxTokens,
        temperature: 0.7,
      });

      responseMessage = response.choices[0].message;
    }

    return responseMessage.content || 'No pude generar una respuesta.';
  } catch (error) {
    console.error('Error processing with OpenAI:', error);
    throw error;
  }
}

