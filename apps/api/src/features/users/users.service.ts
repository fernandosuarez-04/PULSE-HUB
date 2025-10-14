import { User } from '@pulse-hub/shared';
import { createError } from '../../core/middleware/errorHandler';
import { HTTP_STATUS, ERROR_CODES } from '@pulse-hub/shared';

export class UsersService {
  async getAllUsers(): Promise<User[]> {
    // TODO: Implementar lógica para obtener usuarios de la base de datos
    const users: User[] = [
      {
        id: '1',
        email: 'demo@pulsehub.com',
        name: 'Usuario Demo',
        role: 'user' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        email: 'admin@pulsehub.com',
        name: 'Administrador',
        role: 'admin' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return users;
  }

  async getUserById(id: string): Promise<User> {
    // TODO: Implementar lógica para obtener usuario por ID de la base de datos
    if (id === '1') {
      return {
        id: '1',
        email: 'demo@pulsehub.com',
        name: 'Usuario Demo',
        role: 'user' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    throw createError(
      'Usuario no encontrado',
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.NOT_FOUND
    );
  }

  async updateUser(
    id: string,
    data: { name?: string; email?: string }
  ): Promise<User> {
    // TODO: Implementar lógica para actualizar usuario en la base de datos
    const user = await this.getUserById(id);

    return {
      ...user,
      ...data,
      updatedAt: new Date(),
    };
  }

  async deleteUser(id: string): Promise<void> {
    // TODO: Implementar lógica para eliminar usuario de la base de datos
    const user = await this.getUserById(id);
    // console.log(`Usuario ${user.name} eliminado`);
  }
}

export const usersService = new UsersService();

