import { Router } from 'express';
import { contactController } from './contact.controller';
import { validate } from '../../core/middleware/validation.middleware';
import { contactFormSchema } from './contact.types';

/**
 * Rutas para el feature de contacto
 * Base path: /api/v1/contact
 */
export const contactRoutes = Router();

/**
 * POST /api/v1/contact/send
 * Envía el formulario de contacto
 *
 * Body:
 * {
 *   fullName: string,
 *   email: string,
 *   company: string,
 *   role: string,
 *   companySize?: string,
 *   pillarOfInterest?: string,
 *   message: string
 * }
 */
contactRoutes.post(
  '/send',
  validate(contactFormSchema),
  contactController.sendContactForm.bind(contactController)
);

/**
 * GET /api/v1/contact/health
 * Verifica el estado del servicio de correo
 */
contactRoutes.get(
  '/health',
  contactController.checkEmailHealth.bind(contactController)
);
