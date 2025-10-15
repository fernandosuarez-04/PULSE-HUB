/**
 * Netlify Function: AI Chat Handler
 * 
 * Handles POST requests from the frontend chat component.
 * Processes messages with OpenAI and returns responses.
 * 
 * Endpoint: /.netlify/functions/chat
 * Method: POST
 * Body: { message: string, sessionId?: string }
 * Response: { response: string, sessionId: string }
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { isGreeting, getGreetingResponse, processWithOpenAI } from '../../src/netlify-utils/chat-utils';

// Store conversation history per session (in-memory)
// Note: This will reset on each function cold start
const conversationHistory = new Map<string, any[]>();
const MAX_HISTORY_LENGTH = 10;

// Track if user has been greeted per session
const greetedSessions = new Set<string>();

/**
 * Main handler for chat requests
 */
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }

    const { message, sessionId = `session-${Date.now()}` } = JSON.parse(event.body);

    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid message' }),
      };
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Empty message' }),
      };
    }

    console.log(`Processing message for session ${sessionId}: "${trimmedMessage.substring(0, 50)}..."`);

    // Get or initialize conversation history for this session
    let history = conversationHistory.get(sessionId) || [];

    // Check if this is a greeting and user hasn't been greeted yet
    const isFirstGreeting = !greetedSessions.has(sessionId) && isGreeting(trimmedMessage);

    let response: string;

    if (isFirstGreeting) {
      // Handle initial greeting
      response = getGreetingResponse();
      greetedSessions.add(sessionId);
      console.log('Greeting response sent');
    } else {
      // Process with OpenAI
      try {
        response = await processWithOpenAI(trimmedMessage, history);
        console.log('OpenAI response generated');
      } catch (error) {
        console.error('Error processing with OpenAI:', error);
        response = 'Disculpa, tuve un problema al procesar tu pregunta. ¿Podrías reformularla o preguntar algo diferente?';
      }
    }

    // Update conversation history
    history.push(
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: response }
    );

    // Keep only last MAX_HISTORY_LENGTH messages
    if (history.length > MAX_HISTORY_LENGTH * 2) {
      history = history.slice(-MAX_HISTORY_LENGTH * 2);
    }

    conversationHistory.set(sessionId, history);

    // Return response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response,
        sessionId,
      }),
    };
  } catch (error) {
    console.error('Error in chat handler:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

