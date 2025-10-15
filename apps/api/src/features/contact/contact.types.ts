import { z } from 'zod';

/**
 * Schema de validación para el formulario de contacto
 * Valida todos los campos requeridos y opcionales del formulario
 */
export const contactFormSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    company: z.string().min(2, 'El nombre de la empresa es requerido'),
    role: z.string().min(1, 'El rol es requerido'),
    companySize: z.string().optional(),
    pillarOfInterest: z.string().optional(),
    message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>['body'];

/**
 * Interfaz para la respuesta del envío de contacto
 */
export interface ContactResponse {
  success: boolean;
  message: string;
}
