// Cargar variables de entorno PRIMERO (antes de cualquier import)
import dotenv from 'dotenv';
import path from 'path';

// Configurar dotenv con el path explícito
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './core/middleware/errorHandler';
import { authRoutes } from './features/auth/auth.routes';
import { userRoutes } from './features/users/users.routes';
import { contactRoutes } from './features/contact/contact.routes';
import { aiChatRoutes } from './features/ai-chat/ai-chat.routes';

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
app.use(`/api/${API_VERSION}/ai-chat`, aiChatRoutes);

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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🤖 AI Chat REST API disponible en http://localhost:${PORT}/api/${API_VERSION}/ai-chat`);
  console.log(`📚 API Version: ${API_VERSION}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

