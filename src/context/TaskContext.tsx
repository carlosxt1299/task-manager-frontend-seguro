import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import { taskService } from '../services/taskService';
import type { Task, CreateTaskRequest, UpdateTaskRequest, TaskFilter, TaskContextType } from '../types';
import { MESSAGES, TASK_FILTERS } from '../utils/constants';
import toast from 'react-hot-toast';

// Task state type
interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  isLoading: boolean;
  error: string | null;
}

// Task action types
type TaskAction =
  | { type: 'TASKS_START' }
  | { type: 'TASKS_SUCCESS'; payload: Task[] }
  | { type: 'TASKS_ERROR'; payload: string }
  | { type: 'TASK_CREATED'; payload: Task }
  | { type: 'TASK_UPDATED'; payload: Task }
  | { type: 'TASK_DELETED'; payload: string }
  | { type: 'SET_FILTER'; payload: TaskFilter }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: TaskState = {
  tasks: [],
  filter: TASK_FILTERS.ALL as TaskFilter,
  isLoading: false,
  error: null,
};

// Reducer
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'TASKS_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        error: null,
      };
    case 'TASKS_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'TASK_CREATED':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        isLoading: false,
        error: null,
      };
    case 'TASK_UPDATED':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        isLoading: false,
        error: null,
      };
    case 'TASK_DELETED':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        isLoading: false,
        error: null,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
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
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Task provider props
interface TaskProviderProps {
  children: ReactNode;
}

// Task provider component
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch tasks function
  const fetchTasks = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'TASKS_START' });
      const tasks = await taskService.getTasks();
      dispatch({ type: 'TASKS_SUCCESS', payload: tasks });
    } catch (error: any) {
      const errorMessage = error.message || MESSAGES.ERROR.FETCH_TASKS_FAILED;
      dispatch({ type: 'TASKS_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    }
  }, []);

  // Create task function
  const createTask = async (data: CreateTaskRequest): Promise<void> => {
    try {
      dispatch({ type: 'TASKS_START' });
      const newTask = await taskService.createTask(data);
      dispatch({ type: 'TASK_CREATED', payload: newTask });
      toast.success(MESSAGES.SUCCESS.TASK_CREATED);
    } catch (error: any) {
      const errorMessage = error.message || MESSAGES.ERROR.TASK_CREATE_FAILED;
      dispatch({ type: 'TASKS_ERROR', payload: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  };

  // Update task function
  const updateTask = async (id: string, data: UpdateTaskRequest): Promise<void> => {
    try {
      dispatch({ type: 'TASKS_START' });
      const updatedTask = await taskService.updateTask(id, data);
      dispatch({ type: 'TASK_UPDATED', payload: updatedTask });
      toast.success(MESSAGES.SUCCESS.TASK_UPDATED);
    } catch (error: any) {
      const errorMessage = error.message || MESSAGES.ERROR.TASK_UPDATE_FAILED;
      dispatch({ type: 'TASKS_ERROR', payload: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  };

  // Delete task function
  const deleteTask = async (id: string): Promise<void> => {
    try {
      dispatch({ type: 'TASKS_START' });
      await taskService.deleteTask(id);
      dispatch({ type: 'TASK_DELETED', payload: id });
      toast.success(MESSAGES.SUCCESS.TASK_DELETED);
    } catch (error: any) {
      const errorMessage = error.message || MESSAGES.ERROR.TASK_DELETE_FAILED;
      dispatch({ type: 'TASKS_ERROR', payload: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  };

  // Toggle task function
  const toggleTask = async (id: string): Promise<void> => {
    try {
      const task = state.tasks.find(t => t.id === id);
      if (!task) return;

      // Optimistic update
      const updatedTask = { ...task, done: !task.done };
      dispatch({ type: 'TASK_UPDATED', payload: updatedTask });

      // API call
      await taskService.toggleTask(id, !task.done);
    } catch (error: any) {
      // Revert optimistic update on error
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        dispatch({ type: 'TASK_UPDATED', payload: task });
      }
      
      const errorMessage = error.message || MESSAGES.ERROR.TASK_UPDATE_FAILED;
      toast.error(errorMessage);
      throw error;
    }
  };

  // Set filter function
  const setFilter = (filter: TaskFilter): void => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  // Context value
  const value: TaskContextType = {
    tasks: state.tasks,
    filter: state.filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    fetchTasks,
    isLoading: state.isLoading,
    error: state.error,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook to use task context
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
