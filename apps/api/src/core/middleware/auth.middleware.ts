import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, ERROR_CODES } from '@pulse-hub/shared';
import { createError } from './errorHandler';

// Middleware de autenticación (placeholder - implementar con JWT)
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError(
        'Token no proporcionado',
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.AUTHENTICATION_ERROR
      );
    }

    const token = authHeader.substring(7);

    // TODO: Verificar el token JWT aquí
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // req.user = decoded;

    next();
  } catch (error: any) {
    next(error);
  }
};

// Middleware de autorización por roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: Verificar el rol del usuario
    // if (!req.user || !roles.includes(req.user.role)) {
    //   throw createError(
    //     'No autorizado',
    //     HTTP_STATUS.FORBIDDEN,
    //     ERROR_CODES.AUTHORIZATION_ERROR
    //   );
    // }

    next();
  };
};

