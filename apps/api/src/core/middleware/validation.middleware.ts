import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { HTTP_STATUS, ERROR_CODES } from '@pulse-hub/shared';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: {
            message: 'Errores de validación',
            code: ERROR_CODES.VALIDATION_ERROR,
            details: error.errors,
          },
        });
      } else {
        next(error);
      }
    }
  };
};

