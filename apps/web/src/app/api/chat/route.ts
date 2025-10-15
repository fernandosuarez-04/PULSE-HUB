/**
 * Next.js API Route: Chat Handler
 * 
 * Esta ruta funciona en desarrollo local con `npm run dev`.
 * Usa la misma lógica que la Netlify Function.
 * 
 * En producción en Netlify, se puede usar esta ruta o la Netlify Function.
 */

import { NextRequest, NextResponse } from 'next/server';

// Import shared utilities from Netlify Functions
// Note: We'll need to make these utilities accessible from here
import { isGreeting, getGreetingResponse, processWithOpenAI } from '../../../netlify-utils/chat-utils';

// Store conversation history per session (in-memory)
const conversationHistory = new Map<string, any[]>();
const MAX_HISTORY_LENGTH = 10;

// Track if user has been greeted per session
const greetedSessions = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId = `session-${Date.now()}` } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return NextResponse.json(
        { error: 'Empty message' },
        { status: 400 }
      );
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
    return NextResponse.json({
      response,
      sessionId,
    });
  } catch (error) {
    console.error('Error in chat handler:', error);
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

