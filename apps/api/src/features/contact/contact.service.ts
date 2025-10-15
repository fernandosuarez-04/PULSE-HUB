import nodemailer from 'nodemailer';
import type { ContactFormInput } from './contact.types';

/**
 * ContactService - Servicio para manejo de formularios de contacto
 * Responsable de enviar correos electrónicos usando nodemailer
 */
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configurar el transporter de nodemailer
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Envía un correo de notificación cuando se recibe un formulario de contacto
   * @param formData - Datos del formulario de contacto
   */
  async sendContactEmail(formData: ContactFormInput): Promise<void> {
    const {
      fullName,
      email,
      company,
      role,
      companySize,
      pillarOfInterest,
      message,
    } = formData;

    // Email HTML para el destinatario (equipo de ventas)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1F5AF6 0%, #0A1633 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f7f9fb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #0A1633; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #1F5AF6; }
            .footer { text-align: center; margin-top: 30px; color: #5B6472; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Nuevo Contacto - PULSE HUB</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nombre Completo:</div>
                <div class="value">${fullName}</div>
              </div>

              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>

              <div class="field">
                <div class="label">🏢 Empresa:</div>
                <div class="value">${company}</div>
              </div>

              <div class="field">
                <div class="label">💼 Rol:</div>
                <div class="value">${role}</div>
              </div>

              ${companySize ? `
              <div class="field">
                <div class="label">📊 Tamaño de Empresa:</div>
                <div class="value">${companySize} empleados</div>
              </div>
              ` : ''}

              ${pillarOfInterest ? `
              <div class="field">
                <div class="label">🎯 Pilar de Interés:</div>
                <div class="value">${pillarOfInterest}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">💬 Mensaje:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>

              <div class="footer">
                <p>Este mensaje fue enviado desde el formulario de contacto de PULSE HUB</p>
                <p>Responder a: <a href="mailto:${email}">${email}</a></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email de confirmación para el usuario
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1F5AF6 0%, #0A1633 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f7f9fb; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #1F5AF6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #5B6472; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Mensaje Recibido</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${fullName}</strong>,</p>

              <p>Gracias por contactarnos. Hemos recibido tu mensaje y nuestro equipo lo revisará pronto.</p>

              <p>Nos pondremos en contacto contigo en las próximas <strong>24 horas</strong> para discutir cómo PULSE HUB puede ayudarte a transformar tu organización con IA.</p>

              <p>Mientras tanto, te invitamos a:</p>
              <ul>
                <li>Explorar nuestros <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/recursos">recursos gratuitos</a></li>
                <li>Conocer nuestros <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/casos-de-exito">casos de éxito</a></li>
              </ul>

              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Visitar PULSE HUB</a>
              </div>

              <div class="footer">
                <p><strong>Equipo PULSE HUB</strong><br>
                Ecos de Liderazgo</p>
                <p>Si tienes alguna pregunta urgente, responde directamente a este correo.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar correo al equipo de ventas
    await this.transporter.sendMail({
      from: `"PULSE HUB - Contacto" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `🎯 Nuevo Contacto: ${fullName} de ${company}`,
      html: htmlContent,
      replyTo: email,
    });

    // Enviar correo de confirmación al usuario
    await this.transporter.sendMail({
      from: `"PULSE HUB - Ecos de Liderazgo" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '✅ Mensaje Recibido - PULSE HUB',
      html: confirmationHtml,
    });
  }

  /**
   * Verifica la conexión con el servidor SMTP
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Error al verificar conexión SMTP:', error);
      return false;
    }
  }
}

export const contactService = new ContactService();
