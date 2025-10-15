/**
 * ChatMessage Component
 *
 * Displays an individual message in the chat interface.
 * Supports user and assistant messages with different styling.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from './useAIChat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-[var(--primary-600)]'
            : 'bg-[var(--accent-orange)]'
        }`}
      >
        {isUser ? (
          <User size={18} className="text-white" />
        ) : (
          <Image
            src="/AgenteWeb.png"
            alt="Agente IA"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>

      {/* Message content */}
      <div
        className={`flex-1 max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[var(--primary-600)] text-white'
            : 'bg-[var(--neutral-100)] text-[var(--neutral-900)]'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
}
