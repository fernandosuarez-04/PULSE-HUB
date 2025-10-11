'use client';

import { create } from 'zustand';
import { User } from '@pulse-hub/shared';
import { apiService } from '../services/api';
import { LoginCredentials, RegisterData } from '@/features/auth/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiService.post<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>('/auth/login', credentials);

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set({ user, isAuthenticated: true, isLoading: false });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Error al iniciar sesión',
        isLoading: false,
      });
    }
  },

  register: async (data: RegisterData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiService.post<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>('/auth/register', data);

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set({ user, isAuthenticated: true, isLoading: false });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Error al registrar usuario',
        isLoading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuthenticated: false, error: null });
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));

