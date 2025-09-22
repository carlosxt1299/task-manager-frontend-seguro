import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL, STORAGE_KEYS, ROUTES } from '../utils/constants';
import type { ApiError } from '../types';
import toast from 'react-hot-toast';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error;
    
    if (response?.status === 401) {
      // Unauthorized - clear auth data and redirect to login
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      if (window.location.pathname !== ROUTES.LOGIN && 
          window.location.pathname !== ROUTES.REGISTER) {
        window.location.href = ROUTES.LOGIN;
      }
      
      toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
    } else if (response?.status === 403) {
      toast.error('No tienes permisos para realizar esta acción.');
    } else if (response?.status === 404) {
      toast.error('Recurso no encontrado.');
    } else if (response?.status === 422) {
      const errorData = response.data as { message?: string; errors?: Record<string, string[]> };
      if (errorData.errors) {
        // Handle validation errors
        const firstError = Object.values(errorData.errors)[0]?.[0];
        if (firstError) {
          toast.error(firstError);
        }
      } else if (errorData.message) {
        toast.error(errorData.message);
      }
    } else if (response?.status && response.status >= 500) {
      toast.error('Error interno del servidor. Intenta nuevamente más tarde.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Timeout de conexión. Verifica tu conexión a internet.');
    } else if (error.code === 'ERR_NETWORK') {
      toast.error('Error de red. Verifica tu conexión a internet.');
    }

    // Create standardized error object
    const apiError: ApiError = {
      message: (response?.data as any)?.message || error.message || 'Error desconocido',
      status: response?.status,
    };

    return Promise.reject(apiError);
  }
);

export default api;
