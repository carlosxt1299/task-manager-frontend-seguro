import api from './api';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../types';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

export const authService = {
  // Login user

  async login(credentials: LoginRequest): Promise<AuthResponse & { token: string }> {
    const response = await api.post<any>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    // El backend responde con accessToken, lo normalizamos a token
    const { user, accessToken } = response.data;
    const token = accessToken;
    // Store auth data
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { ...response.data, token };
  },

  // Register user
  async register(userData: RegisterRequest): Promise<AuthResponse & { token: string }> {
    const response = await api.post<any>(API_ENDPOINTS.AUTH.REGISTER, userData);
    const { user, accessToken } = response.data;
    const token = accessToken;
    // Store auth data
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { ...response.data, token };
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  // Logout user
  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  // Get stored user
  getStoredUser(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
};
