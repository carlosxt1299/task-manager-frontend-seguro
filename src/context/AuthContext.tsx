import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, AuthContextType } from '../types';
import { MESSAGES } from '../utils/constants';
import toast from 'react-hot-toast';

// Auth state type
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Auth action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      const token = authService.getToken();
      const user = authService.getStoredUser();
      
      if (token && user) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token },
        });
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const authResponse = await authService.login({ email, password });
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: authResponse.user,
          token: authResponse.token,
        },
      });
      
      toast.success(MESSAGES.SUCCESS.LOGIN);
    } catch (error: any) {
      const errorMessage = error.message || MESSAGES.ERROR.LOGIN_FAILED;
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const authResponse = await authService.register({ name, email, password });
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: authResponse.user,
          token: authResponse.token,
        },
      });
      
      toast.success(MESSAGES.SUCCESS.REGISTER);
    } catch (error: any) {
      const errorMessage = error.message || MESSAGES.ERROR.REGISTER_FAILED;
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  // Logout function
  const logout = (): void => {
    authService.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
    toast.success(MESSAGES.SUCCESS.LOGOUT);
  };

  // Context value
  const value: AuthContextType = {
    user: state.user,
    token: state.token,
    login,
    register,
    logout,
    isLoading: state.isLoading,
    error: state.error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
