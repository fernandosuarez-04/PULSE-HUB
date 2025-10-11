import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../core/middleware';
import { loginSchema, registerSchema } from './auth.types';

const router = Router();

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login de usuario
 * @access  Public
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * @route   POST /api/v1/auth/register
 * @desc    Registro de nuevo usuario
 * @access  Public
 */
router.post('/register', validate(registerSchema), authController.register);

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', authController.refreshToken);

export { router as authRoutes };

