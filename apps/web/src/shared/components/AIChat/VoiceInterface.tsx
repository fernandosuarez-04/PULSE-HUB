/**
 * VoiceInterface Component
 *
 * Full-screen overlay for voice interaction with the AI assistant.
 * Displays the assistant's image centered with the conversation history blurred in the background.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import type { ChatMessage as ChatMessageType } from './useAIChat';
import type { UseVoiceRecognitionReturn } from './useVoiceRecognition';

interface VoiceInterfaceProps {
  isActive: boolean;
  voice: UseVoiceRecognitionReturn;
  messages: ChatMessageType[];
  onClose: () => void;
}

// Animation variants for the overlay
const overlayVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// Animation variants for the assistant image (breathing effect)
const imageVariants = {
  breathing: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Animation variants for listening dots
const dotVariants = {
  listening: (i: number) => ({
    y: [0, -8, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.15,
    },
  }),
};

export function VoiceInterface({ isActive, voice, messages, onClose }: VoiceInterfaceProps) {
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'processing' | 'error'>('idle');

  // Update voice state based on voice hook state
  useEffect(() => {
    if (voice.isListening) {
      setVoiceState('listening');
    } else if (voice.transcript && !voice.isListening) {
      setVoiceState('processing');
    } else if (voice.error) {
      setVoiceState('error');
    } else {
      setVoiceState('idle');
    }
  }, [voice.isListening, voice.transcript, voice.error]);

  // Get last 3-4 messages for background
  const recentMessages = messages.slice(-4);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 z-50 flex flex-col items-center justify-center
            bg-white/95 backdrop-blur-sm rounded-[var(--radius-lg)] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full
              bg-[var(--neutral-200)] hover:bg-[var(--neutral-300)]
              text-[var(--neutral-700)]
              transition-colors flex items-center justify-center z-20
              focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]"
            aria-label="Cerrar interfaz de voz"
          >
            <X size={20} />
          </button>

          {/* Background conversation (blurred) */}
          <div
            className="absolute inset-0 px-6 py-20 space-y-4 overflow-hidden pointer-events-none"
            style={{
              filter: 'blur(8px)',
              opacity: 0.3,
            }}
          >
            {recentMessages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          {/* Main content area - centered */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-6">
            {/* Assistant image with breathing animation */}
            <motion.div
              variants={imageVariants}
              animate="breathing"
              className="relative w-32 h-32 rounded-full overflow-hidden
                shadow-lg ring-4 ring-white ring-opacity-50"
            >
              <Image
                src="/AgenteWeb.png"
                alt="Asistente IA"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* State indicators */}
            <div className="flex flex-col items-center gap-3 min-h-[60px]">
              {voiceState === 'listening' && (
                <>
                  {/* Listening dots animation */}
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={dotVariants}
                        animate="listening"
                        className="w-3 h-3 rounded-full bg-[var(--accent-red)]"
                      />
                    ))}
                  </div>
                  <p className="text-lg font-medium text-[var(--neutral-900)] text-center">
                    Escuchando...
                  </p>
                  <p className="text-sm text-[var(--neutral-600)] text-center max-w-xs">
                    Habla ahora, te estoy escuchando
                  </p>
                </>
              )}

              {voiceState === 'processing' && (
                <>
                  <Loader2 size={32} className="text-[var(--primary-600)] animate-spin" />
                  <p className="text-lg font-medium text-[var(--neutral-900)] text-center">
                    Procesando tu mensaje...
                  </p>
                  <p className="text-sm text-[var(--neutral-600)] text-center max-w-xs">
                    {voice.transcript}
                  </p>
                </>
              )}

              {voiceState === 'error' && (
                <>
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-red)]/10
                    flex items-center justify-center">
                    <X size={24} className="text-[var(--accent-red)]" />
                  </div>
                  <p className="text-lg font-medium text-[var(--accent-red)] text-center">
                    Error de reconocimiento
                  </p>
                  <p className="text-sm text-[var(--neutral-600)] text-center max-w-xs">
                    {voice.error}
                  </p>
                  <button
                    onClick={() => {
                      voice.startListening();
                    }}
                    className="mt-2 px-4 py-2 bg-[var(--primary-600)] text-white
                      rounded-[var(--radius-md)] hover:bg-[var(--primary-600)]/90
                      transition-colors text-sm font-medium
                      focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]"
                  >
                    Reintentar
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Instructions at the bottom */}
          <div className="absolute bottom-6 left-0 right-0 text-center px-6">
            <p className="text-xs text-[var(--neutral-500)]">
              {voiceState === 'listening'
                ? 'Presiona el botón de cerrar o espera a terminar de hablar'
                : 'La conversación se mostrará aquí de fondo'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
