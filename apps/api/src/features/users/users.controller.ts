import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { HTTP_STATUS } from '@pulse-hub/shared';
import { asyncHandler } from '../../core/utils';

export class UsersController {
  getAllUsers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await usersService.getAllUsers();

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: users,
        meta: {
          total: users.length,
        },
      });
    }
  );

  getUserById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const user = await usersService.getUserById(id);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
      });
    }
  );

  updateUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const data = req.body;
      const user = await usersService.updateUser(id, data);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
      });
    }
  );

  deleteUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      await usersService.deleteUser(id);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: null,
        message: 'Usuario eliminado correctamente',
      });
    }
  );
}

export const usersController = new UsersController();

