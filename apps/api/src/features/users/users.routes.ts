import { Router } from 'express';
import { usersController } from './users.controller';
import { authenticate } from '../../core/middleware';
import { validate } from '../../core/middleware';
import { getUserSchema, updateUserSchema } from './users.types';

const router = Router();

/**
 * @route   GET /api/v1/users
 * @desc    Obtener todos los usuarios
 * @access  Private
 */
router.get('/', authenticate, usersController.getAllUsers);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Obtener usuario por ID
 * @access  Private
 */
router.get(
  '/:id',
  authenticate,
  validate(getUserSchema),
  usersController.getUserById
);

/**
 * @route   PUT /api/v1/users/:id
 * @desc    Actualizar usuario
 * @access  Private
 */
router.put(
  '/:id',
  authenticate,
  validate(updateUserSchema),
  usersController.updateUser
);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Eliminar usuario
 * @access  Private
 */
router.delete('/:id', authenticate, usersController.deleteUser);

export { router as userRoutes };

