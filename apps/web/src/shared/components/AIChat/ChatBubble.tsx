/**
 * ChatBubble Component
 *
 * Floating button that opens the chat window.
 * Positioned fixed in bottom-right corner with smooth animations.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
  unreadCount?: number;
}

export function ChatBubble({ onClick, unreadCount = 0 }: ChatBubbleProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full
        bg-gradient-to-br from-[var(--primary-600)] to-[var(--accent-orange)]
        text-white shadow-2xl hover:shadow-3xl
        flex items-center justify-center
        cursor-pointer z-[9998]
        transition-shadow duration-300
        ring-4 ring-white/20
        max-sm:bottom-4 max-sm:right-4"
      aria-label="Abrir chat de IA"
    >
      <MessageCircle size={28} />

      {/* Unread badge */}
      {unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full
            bg-[var(--accent-red)] text-white text-xs font-bold
            flex items-center justify-center
            ring-2 ring-white"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </motion.div>
      )}

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full
        bg-gradient-to-br from-[var(--primary-600)] to-[var(--accent-orange)]
        animate-ping opacity-20" />
    </motion.button>
  );
}
