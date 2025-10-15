import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, ERROR_CODES } from '@pulse-hub/shared';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const code = err.code || ERROR_CODES.INTERNAL_ERROR;

  // console.error('Error:', {
  //   message: err.message,
  //   stack: err.stack,
  //   url: req.url,
  //   method: req.method,
  // });

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Error interno del servidor',
      code,
    },
  });
};

export const createError = (
  message: string,
  statusCode: number,
  code: string
): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.code = code;
  return error;
};

