/**
 * useAIChatWebSocket Hook
 *
 * Custom hook for managing AI Chat with WebSocket backend.
 * Handles message sending/receiving, conversation state, and ElevenLabs audio playback.
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useHybridVoice } from './useHybridVoice';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  audio?: string; // Base64-encoded audio from ElevenLabs
  audioError?: boolean; // Flag to indicate audio generation failed
}

export interface UseAIChatReturn {
  messages: ChatMessage[];
  isConnected: boolean;
  isTyping: boolean;
  error: string | null;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
  reconnect: () => void;
  // Audio playback state
  isSpeaking: boolean;
  voiceError: string | null;
  voiceName: string | null;
  stopVoice: () => void;
}

// WebSocket message types
interface ServerMessage {
  type: 'connection_established' | 'agent_message' | 'typing' | 'error';
  text?: string;
  audio?: string; // Base64-encoded audio from ElevenLabs
  error?: string;
  sessionId?: string;
}

interface ClientMessage {
  type: 'user_message';
  text: string;
  sessionId?: string;
}

// WebSocket endpoint
const WS_ENDPOINT =
  process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/ws/chat';

export function useAIChatWebSocket(): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // WebSocket ref
  const wsRef = useRef<WebSocket | null>(null);

  // Session ID persists across reconnections
  const sessionIdRef = useRef<string>(`session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Reconnection state
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const maxReconnectAttempts = 5;

  // Hybrid voice hook (ElevenLabs + Web Speech API fallback)
  const hybridVoice = useHybridVoice();

  /**
   * Connects to WebSocket server
   */
  const connect = useCallback(() => {
    try {
      console.log('🔌 Connecting to WebSocket:', WS_ENDPOINT);

      const ws = new WebSocket(WS_ENDPOINT);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✅ WebSocket connected');
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const serverMessage: ServerMessage = JSON.parse(event.data);

          switch (serverMessage.type) {
            case 'connection_established':
              console.log('🤝 Connection established:', serverMessage.sessionId);
              if (serverMessage.sessionId) {
                sessionIdRef.current = serverMessage.sessionId;
              }
              // Optionally add welcome message
              if (serverMessage.text) {
                const welcomeMessage: ChatMessage = {
                  id: `msg-welcome-${Date.now()}`,
                  role: 'assistant',
                  content: serverMessage.text,
                  timestamp: Date.now(),
                };
                setMessages((prev) => [...prev, welcomeMessage]);
              }
              break;

            case 'agent_message':
              setIsTyping(false);

              if (serverMessage.text) {
                const assistantMessage: ChatMessage = {
                  id: `msg-${Date.now()}-assistant`,
                  role: 'assistant',
                  content: serverMessage.text,
                  timestamp: Date.now(),
                  audio: serverMessage.audio, // Include audio if available
                  audioError: serverMessage.audio === undefined, // Flag if no audio
                };

                setMessages((prev) => [...prev, assistantMessage]);

                // Auto-play voice (ElevenLabs or Web Speech API fallback)
                if (serverMessage.audio) {
                  console.log('🎙️ Playing ElevenLabs audio from backend');
                  hybridVoice.playElevenLabsAudio(serverMessage.audio);
                } else {
                  // Fallback to Web Speech API if no audio from backend
                  console.warn('⚠️ No audio from backend, using Web Speech API fallback');
                  hybridVoice.speakText(serverMessage.text);
                }
              }
              break;

            case 'typing':
              setIsTyping(true);
              break;

            case 'error':
              setIsTyping(false);
              setError(serverMessage.error || 'Error desconocido');
              break;

            default:
              console.warn('Unknown message type:', serverMessage.type);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onerror = (event) => {
        console.error('❌ WebSocket error:', event);
        setError('Error de conexión con el servidor');
      };

      ws.onclose = () => {
        console.log('🔌 WebSocket closed');
        setIsConnected(false);
        wsRef.current = null;

        // Auto-reconnect with exponential backoff
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
          console.log(`🔄 Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts})`);

          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            connect();
          }, delay);
        } else {
          setError('No se pudo conectar con el servidor. Por favor, recarga la página.');
        }
      };
    } catch (err) {
      console.error('Error connecting to WebSocket:', err);
      setError('No se pudo conectar con el servidor');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Disconnect from WebSocket
   */
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
  }, []);

  /**
   * Sends a message to the AI Chat backend
   */
  const sendMessage = useCallback((text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setError('No hay conexión con el servidor');
      return;
    }

    // Add user message to UI immediately
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: trimmedText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setError(null);

    // BARGE-IN: Stop any currently playing voice when user sends a message
    if (hybridVoice.isSpeaking) {
      console.log('⚡ Barge-in: User sent message, stopping voice output');
      hybridVoice.stopSpeaking();
    }

    // Send message via WebSocket
    const clientMessage: ClientMessage = {
      type: 'user_message',
      text: trimmedText,
      sessionId: sessionIdRef.current,
    };

    wsRef.current.send(JSON.stringify(clientMessage));
  }, [hybridVoice]);

  /**
   * Clears all messages
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);

    // Stop any playing voice
    if (hybridVoice.isSpeaking) {
      hybridVoice.stopSpeaking();
    }

    // Generate new session ID when clearing
    sessionIdRef.current = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, [hybridVoice]);

  /**
   * Manual reconnect function
   */
  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttemptsRef.current = 0;
    setError(null);
    connect();
  }, [connect, disconnect]);

  /**
   * Initialize WebSocket connection on mount
   */
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    messages,
    isConnected,
    isTyping,
    error,
    sendMessage,
    clearMessages,
    reconnect,
    // Voice playback state from hybrid voice hook
    isSpeaking: hybridVoice.isSpeaking,
    voiceError: hybridVoice.error,
    voiceName: hybridVoice.voiceName,
    stopVoice: hybridVoice.stopSpeaking,
  };
}
