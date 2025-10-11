import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { LoginInput, RegisterInput } from './auth.types';
import { HTTP_STATUS } from '@pulse-hub/shared';
import { asyncHandler } from '../../core/utils';

export class AuthController {
  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const credentials: LoginInput = req.body;
      const result = await authService.login(credentials);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result,
      });
    }
  );

  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const data: RegisterInput = req.body;
      const result = await authService.register(data);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: result,
      });
    }
  );

  refreshToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result,
      });
    }
  );
}

export const authController = new AuthController();

