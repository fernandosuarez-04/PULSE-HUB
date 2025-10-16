/**
 * AI Chat Routes
 *
 * REST API routes for AI chat functionality.
 */

import { Router } from 'express';
import { sendMessageController, clearSessionController } from './ai-chat.controller';

const router = Router();

/**
 * POST /message
 * Send a message to the AI chat
 *
 * Body: { message: string, sessionId?: string }
 * Response: { success: boolean, data: { text: string, audio?: string, sessionId: string } }
 */
router.post('/message', sendMessageController);

/**
 * DELETE /session/:sessionId
 * Clear conversation history for a session
 *
 * Params: { sessionId: string }
 * Response: { success: boolean, data: { message: string } }
 */
router.delete('/session/:sessionId', clearSessionController);

/**
 * GET /health
 * Health check endpoint for AI chat service
 */
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'AI Chat',
      timestamp: new Date().toISOString(),
    },
  });
});

export const aiChatRoutes = router;
