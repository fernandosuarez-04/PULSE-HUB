/**
 * useAIChat Hook
 *
 * Custom hook for managing AI Chat with REST API backend (Netlify Functions).
 * Handles message sending/receiving and conversation state.
 */

'use client';

import { useState, useCallback, useRef } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface UseAIChatReturn {
  messages: ChatMessage[];
  isConnected: boolean;
  isTyping: boolean;
  error: string | null;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
  reconnect: () => void;
}

// Chat API endpoint (works in both dev and production)
const CHAT_ENDPOINT = '/api/chat';

export function useAIChat(): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Session ID persists across component lifecycle
  const sessionIdRef = useRef<string>(`session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  /**
   * Sends a message to the AI Chat backend
   */
  const sendMessage = useCallback(async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    // Add user message to UI immediately
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: trimmedText,
      timestamp: Date.now(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);

    try {
      // Call Netlify Function
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedText,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      // Add assistant response to UI
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo obtener respuesta. Intenta de nuevo.'
      );
    } finally {
      setIsTyping(false);
    }
  }, []);

  /**
   * Clears all messages
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    // Generate new session ID when clearing
    sessionIdRef.current = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * Reconnect function (no-op for REST API, kept for interface compatibility)
   */
  const reconnect = useCallback(() => {
    // In REST mode, there's no persistent connection to reconnect
    // Just clear any errors
    setError(null);
  }, []);

  return {
    messages,
    isConnected: true, // Always "connected" in REST mode
    isTyping,
    error,
    sendMessage,
    clearMessages,
    reconnect,
  };
}
