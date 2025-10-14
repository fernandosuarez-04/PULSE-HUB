/**
 * useAIChat Hook
 *
 * Custom hook for managing WebSocket connection with AI Chat backend.
 * Handles connection state, message sending/receiving, and reconnection logic.
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/ws/chat';

export function useAIChat(): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  /**
   * Connects to WebSocket server
   */
  const connect = useCallback(() => {
    // Clear any existing reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
    }

    try {
      console.log('🔌 Connecting to WebSocket:', WS_URL);
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('✅ WebSocket connected');
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'connection_established') {
            console.log('🤝 Connection established:', data.sessionId);
            // Optional: Add welcome message to chat
            if (data.text) {
              setMessages((prev) => [
                ...prev,
                {
                  id: `msg-${Date.now()}`,
                  role: 'assistant',
                  content: data.text,
                  timestamp: Date.now(),
                },
              ]);
            }
          } else if (data.type === 'typing') {
            setIsTyping(true);
          } else if (data.type === 'agent_message') {
            setIsTyping(false);
            setMessages((prev) => [
              ...prev,
              {
                id: `msg-${Date.now()}`,
                role: 'assistant',
                content: data.text,
                timestamp: Date.now(),
              },
            ]);
          } else if (data.type === 'error') {
            setIsTyping(false);
            setError(data.error || 'Ocurrió un error');
            console.error('❌ Error from server:', data.error);
          }
        } catch (err) {
          console.error('❌ Error parsing message:', err);
        }
      };

      ws.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        setIsConnected(false);
        setIsTyping(false);

        // Attempt to reconnect with exponential backoff
        if (reconnectAttemptsRef.current < 5) {
          const delay = Math.min(1000 * 2 ** reconnectAttemptsRef.current, 10000);
          console.log(`🔄 Reconnecting in ${delay}ms...`);
          reconnectAttemptsRef.current++;

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          setError(
            'No se pudo conectar con el servidor. Por favor, recarga la página.'
          );
        }
      };

      ws.onerror = (err) => {
        console.error('❌ WebSocket error:', err);
        setError('Error de conexión con el servidor');
      };

      wsRef.current = ws;
    } catch (err) {
      console.error('❌ Error creating WebSocket:', err);
      setError('No se pudo conectar con el servidor');
    }
  }, []);

  /**
   * Sends a message to the AI Chat backend
   */
  const sendMessage = useCallback((text: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setError('No hay conexión con el servidor');
      return;
    }

    const trimmedText = text.trim();
    if (!trimmedText) return;

    // Add user message to UI immediately
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: trimmedText,
        timestamp: Date.now(),
      },
    ]);

    // Send to backend
    wsRef.current.send(
      JSON.stringify({
        type: 'user_message',
        text: trimmedText,
      })
    );

    console.log('📤 Sent message:', trimmedText);
  }, []);

  /**
   * Clears all messages
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  /**
   * Manually reconnects to WebSocket
   */
  const reconnect = useCallback(() => {
    reconnectAttemptsRef.current = 0;
    connect();
  }, [connect]);

  // Initialize connection on mount
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return {
    messages,
    isConnected,
    isTyping,
    error,
    sendMessage,
    clearMessages,
    reconnect,
  };
}
