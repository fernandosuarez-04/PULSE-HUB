// Tipos comunes compartidos entre frontend y backend

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

