import { z } from 'zod';

export const getUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID requerido'),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID requerido'),
  }),
  body: z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
    email: z.string().email('Email inválido').optional(),
  }),
});

export type GetUserInput = z.infer<typeof getUserSchema>['params'];
export type UpdateUserInput = {
  params: z.infer<typeof updateUserSchema>['params'];
  body: z.infer<typeof updateUserSchema>['body'];
};

