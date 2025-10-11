'use client';

import { useAuthStore } from '@/core/stores/authStore';
import { LoginCredentials, RegisterData } from '../types';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, register } =
    useAuthStore();

  const handleLogin = async (credentials: LoginCredentials) => {
    await login(credentials);
  };

  const handleLogout = () => {
    logout();
  };

  const handleRegister = async (data: RegisterData) => {
    await register(data);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
};

