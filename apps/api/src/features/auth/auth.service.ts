import { User, AuthTokens } from '@pulse-hub/shared';
import { LoginInput, RegisterInput } from './auth.types';
import { createError } from '../../core/middleware/errorHandler';
import { HTTP_STATUS, ERROR_CODES } from '@pulse-hub/shared';

export class AuthService {
  async login(credentials: LoginInput): Promise<{ user: User } & AuthTokens> {
    // TODO: Implementar lógica de login con base de datos y JWT
    // Por ahora, retornamos datos de ejemplo

    const { email, password } = credentials;

    // Simulación de validación
    if (email === 'demo@pulsehub.com' && password === 'demo123') {
      const user: User = {
        id: '1',
        email,
        name: 'Usuario Demo',
        role: 'user' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        user,
        accessToken: 'demo-access-token',
        refreshToken: 'demo-refresh-token',
      };
    }

    throw createError(
      'Credenciales inválidas',
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.AUTHENTICATION_ERROR
    );
  }

  async register(
    data: RegisterInput
  ): Promise<{ user: User } & AuthTokens> {
    // TODO: Implementar lógica de registro con base de datos y JWT
    // Verificar si el email ya existe
    // Hashear la contraseña
    // Crear el usuario en la base de datos
    // Generar tokens JWT

    const user: User = {
      id: '2',
      email: data.email,
      name: data.name,
      role: 'user' as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {
      user,
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    // TODO: Implementar lógica de refresh token
    return {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    };
  }
}

export const authService = new AuthService();

