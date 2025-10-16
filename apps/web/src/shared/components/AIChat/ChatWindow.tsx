/**
 * ChatWindow Component
 *
 * The expanded chat window containing messages and input field.
 * Displayed when the chat bubble is clicked.
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, WifiOff, Mic, MicOff, Volume2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { VoiceInterface } from './VoiceInterface';
import { useVoiceRecognition } from './useVoiceRecognition';
import { useVoiceSynthesis } from './useVoiceSynthesis';
import type { UseAIChatReturn } from './useAIChat';

// Audio Equalizer Icon Component
const AudioEqualizerIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    className={className}
    fill="currentColor"
  >
    {/* Left dot */}
    <circle cx="2" cy="9" r="1.5" />

    {/* Left bar */}
    <rect x="5" y="6" width="2" height="6" rx="1" />

    {/* Center bar (tallest) */}
    <rect x="8" y="3" width="2.5" height="12" rx="1.25" />

    {/* Right bar */}
    <rect x="11.5" y="6" width="2" height="6" rx="1" />

    {/* Right dot */}
    <circle cx="16" cy="9" r="1.5" />
  </svg>
);

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  chat: UseAIChatReturn;
}

export function ChatWindow({ isOpen, onClose, chat }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSpokenMessageIdRef = useRef<string | null>(null);

  // Voice recognition hook (for user input)
  const voice = useVoiceRecognition();

  // Voice synthesis hook (for agent responses) - DISABLED in favor of ElevenLabs
  // const synthesis = useVoiceSynthesis();

  // Dummy synthesis object for compatibility (ElevenLabs handles audio now)
  const synthesis = {
    isSupported: false,
    isSpeaking: chat.isPlayingAudio || false,
    selectedVoice: null,
    availableVoices: [],
    speak: () => {},
    stop: () => {},
    error: null,
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.messages, chat.isTyping]);

  // Focus input and warm up speech synthesis when window opens
  useEffect(() => {
    if (isOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // Focus input and optionally warm-up speech synthesis if the
      // implementation exposes a warmUp() helper. Some implementations
      // (current hook) don't provide it, so guard the call to avoid
      // runtime errors like "synthesis.warmUp is not a function".
      if (synthesis.isSupported && typeof (synthesis as any).warmUp === 'function') {
        (synthesis as any).warmUp();
      }
    }
  }, [isOpen, synthesis]);

  // Handle voice transcript
  useEffect(() => {
    if (voice.transcript && !voice.isListening) {
      // When voice recognition completes, set transcript to input
      setInputValue(voice.transcript);
      voice.clearTranscript();
      // Auto-submit the voice message
      if (voice.transcript.trim() && !chat.isTyping) {
        chat.sendMessage(voice.transcript);
        setInputValue('');
      }
    }
  }, [voice.transcript, voice.isListening, chat, voice]);

  // Auto-speak agent responses (ElevenLabs audio is auto-played in useAIChatWebSocket)
  // No need for manual synthesis here - ElevenLabs audio plays automatically

  // BARGE-IN: This is handled by sendMessage in useAIChatWebSocket
  // (stops audio when user sends a message)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !chat.isTyping) {
      chat.sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    if (voice.isListening) {
      voice.stopListening();
    } else {
      voice.startListening();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 w-[400px] max-h-[600px] min-h-[500px]
            bg-white rounded-3xl shadow-2xl
            flex flex-col overflow-hidden z-[9999]
            border border-[var(--neutral-200)]
            lg:w-[400px] lg:max-h-[600px] lg:min-h-[500px]
            md:w-[380px] md:max-h-[580px] md:min-h-[480px] md:bottom-4 md:right-4
            sm:w-[360px] sm:max-h-[560px] sm:min-h-[460px] sm:bottom-4 sm:right-4
            max-sm:w-[calc(100vw-1rem)] max-sm:max-h-[calc(100vh-1rem)] max-sm:min-h-[400px] max-sm:bottom-2 max-sm:right-2"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-orange)]
            text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <Image
                  src="/AgenteWeb.png"
                  alt="Agente IA"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-base">Asistente IA</h3>
                <p className="text-xs text-white/80">
                  {synthesis.isSpeaking ? (
                    <span key="speaking" className="inline-flex items-center">
                      <Volume2
                        size={12}
                        className="inline-block mr-1.5 animate-pulse"
                        aria-hidden="true"
                      />
                      Hablando...
                    </span>
                  ) : chat.isConnected ? (
                    <span key="online" className="inline-flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-green)] mr-1.5" />
                      En línea
                    </span>
                  ) : (
                    <span key="offline" className="inline-flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-red)] mr-1.5" />
                      Desconectado
                    </span>
                  )}
                </p>
                {/* Voice info */}
                {synthesis.isSupported && synthesis.selectedVoice && (
                  <p className="text-[10px] text-white/60 mt-0.5">
                    🎙️ {synthesis.selectedVoice.name}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30
                transition-colors flex items-center justify-center"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto min-h-0 px-6 py-4 space-y-4 bg-[var(--neutral-100)]/30
            lg:px-6 lg:py-4
            md:px-5 md:py-3
            sm:px-4 sm:py-3
            max-sm:px-3 max-sm:py-2">
            {chat.messages.length === 0 && !chat.error ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-100)]
                  flex items-center justify-center mb-4 overflow-hidden">
                  <Image
                    src="/AgenteWeb.png"
                    alt="Agente IA"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-[var(--neutral-900)] mb-2">
                  ¡Hola! 👋
                </h4>
                <p className="text-sm text-[var(--neutral-600)] max-w-xs">
                  Pregúntame sobre estrategias de adopción de IA, capacitación,
                  automatización y mejores prácticas empresariales.
                </p>
              </div>
            ) : (
              <>
                {chat.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {/* Typing indicator */}
                {chat.isTyping && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full
                      bg-[var(--accent-orange)] flex items-center justify-center overflow-hidden">
                      <Image
                        src="/AgenteWeb.png"
                        alt="Agente IA"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <div className="bg-[var(--neutral-100)] rounded-2xl
                      px-4 py-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[var(--neutral-400)]
                        animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[var(--neutral-400)]
                        animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[var(--neutral-400)]
                        animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}

            {/* Error message */}
            {chat.error && (
              <div className="bg-[var(--accent-red)]/10 text-[var(--accent-red)]
                px-4 py-3 rounded-2xl text-sm flex items-center gap-2">
                <WifiOff size={16} />
                <span>{chat.error}</span>
                {!chat.isConnected && (
                  <button
                    onClick={chat.reconnect}
                    className="ml-auto text-xs underline hover:no-underline"
                  >
                    Reintentar
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-[var(--neutral-200)] px-4 py-4 bg-white
              lg:px-4 lg:py-4
              md:px-3 md:py-3
              sm:px-3 sm:py-3
              max-sm:px-2 max-sm:py-2"
          >
            {/* Voice recognition error */}
            {voice.error && (
              <div className="mb-3 px-3 py-2 bg-[var(--accent-red)]/10 text-[var(--accent-red)]
                rounded-2xl text-xs flex items-center gap-2">
                <WifiOff size={14} />
                <span>{voice.error}</span>
              </div>
            )}

            {/* Listening indicator */}
            {voice.isListening && (
              <div className="mb-3 px-3 py-2 bg-[var(--accent-red)]/10 text-[var(--accent-red)]
                rounded-2xl text-xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-red)] animate-pulse" />
                <span className="font-medium">Escuchando...</span>
              </div>
            )}

            {/* Voice synthesis enable suggestion */}
            {synthesis.error && (
              <div className="mb-3 px-3 py-2 bg-[var(--primary-50)] text-[var(--primary-700)] rounded-2xl text-xs flex items-center gap-2">
                <Volume2 size={14} />
                <span className="flex-1">{synthesis.error}</span>
                {(synthesis as any).enable ? (
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        (synthesis as any).enable();
                        const lastMessage = chat.messages[chat.messages.length - 1];
                        if (
                          lastMessage &&
                          lastMessage.role === 'assistant' &&
                          lastMessage.id !== lastSpokenMessageIdRef.current &&
                          lastMessage.content
                        ) {
                          lastSpokenMessageIdRef.current = lastMessage.id;
                          synthesis.speak(lastMessage.content);
                        }
                      } catch (e) {
                        // ignore
                      }
                    }}
                    className="ml-2 underline text-[var(--primary-700)]"
                  >
                    Habilitar voz
                  </button>
                ) : null}
              </div>
            )}

            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta..."
                disabled={!chat.isConnected || chat.isTyping || voice.isListening}
                className="flex-1 px-3 py-2.5 border border-[var(--neutral-200)]
                  rounded-2xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]
                  focus:border-transparent
                  disabled:opacity-50 disabled:cursor-not-allowed
                  placeholder:text-[var(--neutral-400)]
                  lg:px-4 lg:py-2.5
                  md:px-3 md:py-2
                  sm:px-3 sm:py-2
                  max-sm:px-2 max-sm:py-2 max-sm:text-xs"
              />

              {/* Voice recognition button (only show if supported) */}
              {voice.isSupported && (
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  disabled={!chat.isConnected || chat.isTyping}
                  className={`px-3 py-2.5 rounded-2xl
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center min-w-[40px]
                    lg:px-4 lg:py-2.5 lg:min-w-[44px]
                    md:px-3 md:py-2 md:min-w-[40px]
                    sm:px-3 sm:py-2 sm:min-w-[40px]
                    max-sm:px-2 max-sm:py-2 max-sm:min-w-[36px]
                    ${voice.isListening
                      ? 'bg-[var(--accent-red)] text-white hover:bg-[var(--accent-red)]/90'
                      : 'bg-[var(--neutral-200)] text-[var(--neutral-700)] hover:bg-[var(--neutral-300)]'
                    }`}
                  aria-label={voice.isListening ? 'Detener grabación' : 'Iniciar grabación de voz'}
                >
                  <AudioEqualizerIcon size={18} />
                </button>
              )}

              <button
                type="submit"
                disabled={!chat.isConnected || chat.isTyping || !inputValue.trim() || voice.isListening}
                className="px-3 py-2.5 bg-[var(--primary-600)] text-white
                  rounded-2xl hover:bg-[var(--primary-600)]/90
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center min-w-[40px]
                  lg:px-4 lg:py-2.5 lg:min-w-[44px]
                  md:px-3 md:py-2 md:min-w-[40px]
                  sm:px-3 sm:py-2 sm:min-w-[40px]
                  max-sm:px-2 max-sm:py-2 max-sm:min-w-[36px]"
                aria-label="Enviar mensaje"
              >
                {chat.isTyping ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
            <p className="text-xs text-[var(--neutral-500)] mt-2 text-center
              lg:text-xs
              md:text-xs
              sm:text-xs
              max-sm:text-[10px] max-sm:leading-tight">
              <span className="hidden sm:inline">Presiona Enter para enviar • Shift+Enter para nueva línea</span>
              <span className="sm:hidden">Enter para enviar • Shift+Enter nueva línea</span>
              {voice.isSupported && (
                <>
                  <span className="hidden sm:inline"> • Click en micrófono para voz</span>
                  <span className="sm:hidden"> • Micrófono para voz</span>
                </>
              )}
            </p>
          </form>

          {/* Voice Interface Overlay */}
          <VoiceInterface
            isActive={voice.isListening}
            voice={voice}
            messages={chat.messages}
            onClose={() => voice.stopListening()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
