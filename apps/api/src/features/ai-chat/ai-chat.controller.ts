/**
 * AI Chat Controller
 *
 * REST API controller for AI chat functionality.
 * Handles message processing with OpenAI and ElevenLabs audio generation.
 */

import { Request, Response } from 'express';
import { AIChatService } from './ai-chat.service';

// Map to store AI Chat Service instances per session
const chatInstances = new Map<string, AIChatService>();

/**
 * POST /api/v1/ai-chat/message
 *
 * Processes a user message and returns AI response with audio
 */
export async function sendMessageController(req: Request, res: Response) {
  try {
    const { message, sessionId } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'El campo "message" es requerido y debe ser un string',
          code: 'INVALID_MESSAGE',
        },
      });
    }

    // Use provided sessionId or generate new one
    const effectiveSessionId = sessionId || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Get or create chat service instance for this session
    let chatService = chatInstances.get(effectiveSessionId);

    if (!chatService) {
      console.log(`🆕 Creating new chat service for session: ${effectiveSessionId}`);
      chatService = new AIChatService();
      chatInstances.set(effectiveSessionId, chatService);
    }

    // Process message with AI Chat Service
    const startTime = Date.now();
    console.log(`📩 Processing message for session ${effectiveSessionId}: "${message.substring(0, 50)}..."`);

    const chatResponse = await chatService.handleMessageWithAudio(message);

    const duration = Date.now() - startTime;
    console.log(`✅ Response generated in ${duration}ms (text: ${chatResponse.text.length} chars, audio: ${chatResponse.audio ? 'yes' : 'no'})`);

    // Send response
    return res.status(200).json({
      success: true,
      data: {
        text: chatResponse.text,
        audio: chatResponse.audio, // Base64-encoded audio from ElevenLabs
        sessionId: effectiveSessionId,
      },
    });
  } catch (error) {
    console.error('❌ Error in sendMessageController:', error);

    return res.status(500).json({
      success: false,
      error: {
        message: 'Error al procesar el mensaje. Por favor, intenta de nuevo.',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * DELETE /api/v1/ai-chat/session/:sessionId
 *
 * Clears conversation history for a session
 */
export async function clearSessionController(req: Request, res: Response) {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'El campo "sessionId" es requerido',
          code: 'INVALID_SESSION_ID',
        },
      });
    }

    const chatService = chatInstances.get(sessionId);

    if (chatService) {
      chatService.clearHistory();
      chatInstances.delete(sessionId);
      console.log(`🗑️ Session cleared: ${sessionId}`);
    }

    return res.status(200).json({
      success: true,
      data: {
        message: 'Sesión limpiada exitosamente',
      },
    });
  } catch (error) {
    console.error('❌ Error in clearSessionController:', error);

    return res.status(500).json({
      success: false,
      error: {
        message: 'Error al limpiar la sesión',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Cleanup inactive sessions periodically
 * Sessions are removed after 1 hour of inactivity
 */
const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour
const sessionLastActivity = new Map<string, number>();

setInterval(() => {
  const now = Date.now();
  const sessionsToRemove: string[] = [];

  sessionLastActivity.forEach((lastActivity, sessionId) => {
    if (now - lastActivity > SESSION_TIMEOUT) {
      sessionsToRemove.push(sessionId);
    }
  });

  sessionsToRemove.forEach((sessionId) => {
    const chatService = chatInstances.get(sessionId);
    if (chatService) {
      chatService.clearHistory();
      chatInstances.delete(sessionId);
      sessionLastActivity.delete(sessionId);
      console.log(`🧹 Cleaned up inactive session: ${sessionId}`);
    }
  });
}, 5 * 60 * 1000); // Check every 5 minutes

/**
 * Track session activity
 */
export function trackSessionActivity(sessionId: string) {
  sessionLastActivity.set(sessionId, Date.now());
}
