import { Request, Response } from 'express';
import { contactService } from './contact.service';
import type { ContactFormInput, ContactResponse } from './contact.types';

/**
 * ContactController - Controlador para las rutas de contacto
 * Maneja las peticiones HTTP y coordina con el servicio
 */
export class ContactController {
  /**
   * Maneja el envío del formulario de contacto
   * POST /api/v1/contact/send
   */
  async sendContactForm(req: Request, res: Response): Promise<void> {
    try {
      const formData: ContactFormInput = req.body;

      // Enviar los correos
      await contactService.sendContactEmail(formData);

      const response: ContactResponse = {
        success: true,
        message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error al enviar formulario de contacto:', error);

      const response: ContactResponse = {
        success: false,
        message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
      };

      res.status(500).json(response);
    }
  }

  /**
   * Verifica el estado del servicio de correo
   * GET /api/v1/contact/health
   */
  async checkEmailHealth(req: Request, res: Response): Promise<void> {
    try {
      const isConnected = await contactService.verifyConnection();

      res.status(200).json({
        success: true,
        emailService: isConnected ? 'connected' : 'disconnected',
        message: isConnected
          ? 'Servicio de correo funcionando correctamente'
          : 'No se pudo conectar al servidor de correo',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        emailService: 'error',
        message: 'Error al verificar el servicio de correo',
      });
    }
  }
}

export const contactController = new ContactController();
