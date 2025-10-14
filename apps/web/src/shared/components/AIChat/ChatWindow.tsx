/**
 * ChatWindow Component
 *
 * The expanded chat window containing messages and input field.
 * Displayed when the chat bubble is clicked.
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, WifiOff } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import type { UseAIChatReturn } from './useAIChat';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  chat: UseAIChatReturn;
}

export function ChatWindow({ isOpen, onClose, chat }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.messages, chat.isTyping]);

  // Focus input when window opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 w-[400px] h-[600px]
            bg-white rounded-[var(--radius-lg)] shadow-2xl
            flex flex-col overflow-hidden z-[9999]
            border border-[var(--neutral-200)]
            sm:w-[400px] sm:h-[600px]
            max-sm:w-[calc(100vw-2rem)] max-sm:h-[calc(100vh-2rem)] max-sm:bottom-4 max-sm:right-4"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-orange)]
            text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3 className="font-semibold text-base">Asistente IA</h3>
                <p className="text-xs text-white/80">
                  {chat.isConnected ? (
                    <>
                      <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-green)] mr-1.5" />
                      En línea
                    </>
                  ) : (
                    <>
                      <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-red)] mr-1.5" />
                      Desconectado
                    </>
                  )}
                </p>
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
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[var(--neutral-100)]/30">
            {chat.messages.length === 0 && !chat.error ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-100)]
                  flex items-center justify-center mb-4">
                  🤖
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
                      bg-[var(--accent-orange)] flex items-center justify-center">
                      🤖
                    </div>
                    <div className="bg-[var(--neutral-100)] rounded-[var(--radius-md)]
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
                px-4 py-3 rounded-[var(--radius-md)] text-sm flex items-center gap-2">
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
            className="border-t border-[var(--neutral-200)] px-4 py-4 bg-white"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta..."
                disabled={!chat.isConnected || chat.isTyping}
                className="flex-1 px-4 py-2.5 border border-[var(--neutral-200)]
                  rounded-[var(--radius-md)] text-sm
                  focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]
                  focus:border-transparent
                  disabled:opacity-50 disabled:cursor-not-allowed
                  placeholder:text-[var(--neutral-400)]"
              />
              <button
                type="submit"
                disabled={!chat.isConnected || chat.isTyping || !inputValue.trim()}
                className="px-4 py-2.5 bg-[var(--primary-600)] text-white
                  rounded-[var(--radius-md)] hover:bg-[var(--primary-600)]/90
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center min-w-[44px]"
                aria-label="Enviar mensaje"
              >
                {chat.isTyping ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
            <p className="text-xs text-[var(--neutral-500)] mt-2 text-center">
              Presiona Enter para enviar • Shift+Enter para nueva línea
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
