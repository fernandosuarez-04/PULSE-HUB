import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './core/middleware/errorHandler';
import { authRoutes } from './features/auth/auth.routes';
import { userRoutes } from './features/users/users.routes';

// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

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
  console.log(`📚 API Version: ${API_VERSION}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

