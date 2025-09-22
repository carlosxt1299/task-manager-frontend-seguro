// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: 'authToken',
  USER: 'authUser',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  TASKS: '/tasks',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  TASKS: {
    BASE: '/tasks',
    BY_ID: (id: string) => `/tasks/${id}`,
  },
} as const;

// Task filters
export const TASK_FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending',
} as const;

// Messages
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Inicio de sesión exitoso',
    REGISTER: 'Registro exitoso',
    TASK_CREATED: 'Tarea creada exitosamente',
    TASK_UPDATED: 'Tarea actualizada exitosamente',
    TASK_DELETED: 'Tarea eliminada exitosamente',
    LOGOUT: 'Sesión cerrada exitosamente',
  },
  ERROR: {
    LOGIN_FAILED: 'Error al iniciar sesión',
    REGISTER_FAILED: 'Error al registrarse',
    TASK_CREATE_FAILED: 'Error al crear la tarea',
    TASK_UPDATE_FAILED: 'Error al actualizar la tarea',
    TASK_DELETE_FAILED: 'Error al eliminar la tarea',
    FETCH_TASKS_FAILED: 'Error al cargar las tareas',
    NETWORK_ERROR: 'Error de conexión',
    UNAUTHORIZED: 'No autorizado',
    VALIDATION_ERROR: 'Error de validación',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'Este campo es obligatorio',
    INVALID_EMAIL: 'Email inválido',
    PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 6 caracteres',
    PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
    TITLE_MAX_LENGTH: 'El título no puede exceder 100 caracteres',
    DESCRIPTION_MAX_LENGTH: 'La descripción no puede exceder 500 caracteres',
  },
} as const;

// UI Constants
export const UI = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  LOADING_DELAY: 200,
} as const;
