/**
 * Types for AI Chat Feature
 *
 * This file contains all TypeScript types and interfaces for the AI Chat feature,
 * including WebSocket messages, conversation history, and OpenAI configuration.
 */

/**
 * Message types for WebSocket communication
 */
export type WebSocketMessageType = 'user_message' | 'agent_message' | 'error' | 'typing' | 'connection_established';

/**
 * WebSocket message structure from client to server
 */
export interface ClientMessage {
  type: 'user_message';
  text: string;
  sessionId?: string;
}

/**
 * WebSocket message structure from server to client
 */
export interface ServerMessage {
  type: WebSocketMessageType;
  text?: string;
  audio?: string; // Base64-encoded audio from ElevenLabs
  error?: string;
  sessionId?: string;
}

/**
 * Conversation message stored in history
 */
export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: number;
  tool_call_id?: string;
}

/**
 * OpenAI Service configuration
 */
export interface OpenAIConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature?: number;
}

/**
 * Session information
 */
export interface ChatSession {
  id: string;
  connectionId: string;
  history: ConversationMessage[];
  createdAt: number;
  lastActivity: number;
}

/**
 * Coda table row structure
 */
export interface CodaRow {
  id: string;
  name: string;
  values: Record<string, any>;
  href: string;
}

/**
 * Coda column information
 */
export interface ColumnInfo {
  id: string;
  name: string;
  type: string;
}

/**
 * Coda API response for table rows
 */
export interface TableRowsResponse {
  items: CodaRow[];
  href: string;
  nextPageToken?: string;
}

/**
 * Coda API response for columns
 */
export interface ColumnsResponse {
  items: ColumnInfo[];
  href: string;
}
