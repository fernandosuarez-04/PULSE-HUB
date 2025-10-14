// server/types/conversation.ts

/**
 * Representa un mensaje en la conversación
 */
export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

/**
 * Historial de conversación para una sesión
 */
export interface ConversationHistory {
  sessionId: string;
  messages: ConversationMessage[];
  createdAt: number;
  lastUpdated: number;
}

/**
 * Resultado de búsqueda en Coda con metadatos
 */
export interface CodaSearchResult {
  content: string;
  relevanceScore: number;
  rowId?: string;
  found: boolean;
}

/**
 * Configuración de OpenAI
 */
export interface OpenAIConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature?: number;
}
