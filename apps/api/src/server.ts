// Cargar variables de entorno PRIMERO (antes de cualquier import)
import dotenv from 'dotenv';
import path from 'path';

// Configurar dotenv con el path explícito
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { errorHandler } from './core/middleware/errorHandler';
import { authRoutes } from './features/auth/auth.routes';
import { userRoutes } from './features/users/users.routes';
import { contactRoutes } from './features/contact/contact.routes';
import { AIChatService } from './features/ai-chat';
import type { ClientMessage, ServerMessage } from './features/ai-chat';

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Debug: Verificar que las variables de entorno se cargaron
console.log('🔧 Configuración del servidor:');
console.log('  - PORT:', PORT);
console.log('  - NODE_ENV:', process.env.NODE_ENV);
console.log('  - OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Configurado' : '❌ No configurado');
console.log('  - ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS);

// Middleware global
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'PULSE-HUB API is running' });
});

// API Routes
const API_VERSION = process.env.API_VERSION || 'v1';
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/contact`, contactRoutes);

// Error handling middleware (debe ir al final)
app.use(errorHandler);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Ruta no encontrada',
      code: 'NOT_FOUND',
    },
  });
});

// Create HTTP server for WebSocket
const server = createServer(app);

// Initialize WebSocket Server
const wss = new WebSocketServer({ server, path: '/ws/chat' });

// Map to store AI Chat Service instances per connection
const chatInstances = new Map<WebSocket, AIChatService>();

// console.log('🔌 Initializing WebSocket Server for AI Chat...');

wss.on('connection', (ws: WebSocket) => {
  // console.log('👤 New WebSocket client connected');

  // Create a new AI Chat Service instance for this connection
  const chatService = new AIChatService();
  chatInstances.set(ws, chatService);

  // Send connection established message
  const welcomeMessage: ServerMessage = {
    type: 'connection_established',
    text: '¡Conectado! Escribe tu pregunta sobre estrategias de IA empresarial.',
    sessionId: chatService.getSessionId(),
  };
  ws.send(JSON.stringify(welcomeMessage));

  // Handle incoming messages
  ws.on('message', async (data: Buffer) => {
    try {
      const clientMessage: ClientMessage = JSON.parse(data.toString());

      if (clientMessage.type === 'user_message') {
        // console.log(`📩 Received message: "${clientMessage.text}"`);

        // Send typing indicator
        const typingMessage: ServerMessage = {
          type: 'typing',
        };
        ws.send(JSON.stringify(typingMessage));

        // Process message with AI Chat Service
        const chatService = chatInstances.get(ws);
        if (!chatService) {
          throw new Error('Chat service not found for connection');
        }

        // Get response with audio
        const chatResponse = await chatService.handleMessageWithAudio(clientMessage.text);

        // Send agent response with audio
        const agentMessage: ServerMessage = {
          type: 'agent_message',
          text: chatResponse.text,
          audio: chatResponse.audio, // Base64-encoded audio from ElevenLabs
        };
        ws.send(JSON.stringify(agentMessage));

        // console.log(`📤 Sent response: "${chatResponse.text.substring(0, 50)}..." ${chatResponse.audio ? '🎙️ with audio' : ''}`);
      }
    } catch (error) {
      // console.error('❌ Error processing message:', error);

      // Send error message to client
      const errorMessage: ServerMessage = {
        type: 'error',
        error:
          'Ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.',
      };
      ws.send(JSON.stringify(errorMessage));
    }
  });

  // Handle disconnection
  ws.on('close', () => {
    // console.log('👋 WebSocket client disconnected');
    const chatService = chatInstances.get(ws);
    if (chatService) {
      chatService.clearHistory();
      chatInstances.delete(ws);
    }
  });

  // Handle errors
  ws.on('error', (error) => {
    // console.error('❌ WebSocket error:', error);
  });
});

// Iniciar servidor
server.listen(PORT, () => {
  // console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  // console.log(`🔌 WebSocket disponible en ws://localhost:${PORT}/ws/chat`);
  // console.log(`📚 API Version: ${API_VERSION}`);
  // console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

