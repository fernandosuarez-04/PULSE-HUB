/**
 * AIChat Component
 *
 * Main AI Chat component that combines the floating bubble and chat window.
 * Manages the open/closed state and integrates with the WebSocket backend.
 *
 * Usage: Place in layout.tsx to make it available on all pages.
 */

'use client';

import React, { useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatWindow } from './ChatWindow';
import { useAIChatWebSocket } from './useAIChatWebSocket';

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const chat = useAIChatWebSocket();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating chat bubble */}
      {!isOpen && <ChatBubble onClick={handleToggle} />}

      {/* Chat window */}
      <ChatWindow isOpen={isOpen} onClose={handleClose} chat={chat} />
    </>
  );
}
