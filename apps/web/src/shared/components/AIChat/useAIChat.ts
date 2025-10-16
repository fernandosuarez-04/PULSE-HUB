/**
 * useAIChat Hook
 *
 * Custom hook for managing AI Chat with REST API backend.
 * Handles message sending/receiving, conversation state, and ElevenLabs audio playback.
 */

'use client';

import { useState, useCallback, useRef } from 'react';
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

// Chat API endpoint
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const CHAT_ENDPOINT = `${API_URL}/v1/ai-chat/message`;

export function useAIChat(): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Session ID persists across component lifecycle
  const sessionIdRef = useRef<string>(`session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Hybrid voice hook (ElevenLabs + Web Speech API fallback)
  const hybridVoice = useHybridVoice();

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

    // BARGE-IN: Stop any currently playing voice when user sends a message
    if (hybridVoice.isSpeaking) {
      console.log('⚡ Barge-in: User sent message, stopping voice output');
      hybridVoice.stopSpeaking();
    }

    try {
      console.log('📤 Sending message to REST API:', CHAT_ENDPOINT);

      // Call REST API endpoint
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

      const result = await response.json();

      // Check if response is successful
      if (!result.success || !result.data) {
        throw new Error('Respuesta inválida del servidor');
      }

      const { text, audio, sessionId } = result.data;

      // Update session ID if provided
      if (sessionId) {
        sessionIdRef.current = sessionId;
      }

      // Add assistant response to UI
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: text,
        timestamp: Date.now(),
        audio: audio, // Include audio if available
        audioError: audio === undefined, // Flag if no audio
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Auto-play voice (ElevenLabs or Web Speech API fallback)
      if (audio) {
        console.log('🎙️ Playing ElevenLabs audio from backend');
        hybridVoice.playElevenLabsAudio(audio);
      } else {
        // Fallback to Web Speech API if no audio from backend
        console.warn('⚠️ No audio from backend, using Web Speech API fallback');
        hybridVoice.speakText(text);
      }
    } catch (err) {
      console.error('❌ Error sending message:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo obtener respuesta. Intenta de nuevo.'
      );
    } finally {
      setIsTyping(false);
    }
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
    // Voice playback state from hybrid voice hook
    isSpeaking: hybridVoice.isSpeaking,
    voiceError: hybridVoice.error,
    voiceName: hybridVoice.voiceName,
    stopVoice: hybridVoice.stopSpeaking,
  };
}
