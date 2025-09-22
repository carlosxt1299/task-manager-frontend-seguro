import api from './api';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types';
import { API_ENDPOINTS } from '../utils/constants';

export const taskService = {
  // Get all tasks for the authenticated user
  async getTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>(API_ENDPOINTS.TASKS.BASE);
    return response.data;
  },

  // Get a specific task by ID
  async getTask(id: string): Promise<Task> {
    const response = await api.get<Task>(API_ENDPOINTS.TASKS.BY_ID(id));
    return response.data;
  },

  // Create a new task
  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const response = await api.post<Task>(API_ENDPOINTS.TASKS.BASE, taskData);
    return response.data;
  },

  // Update an existing task
  async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
    const response = await api.patch<Task>(API_ENDPOINTS.TASKS.BY_ID(id), taskData);
    return response.data;
  },

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.TASKS.BY_ID(id));
  },

  // Toggle task completion status
  async toggleTask(id: string, done: boolean): Promise<Task> {
    const response = await api.patch<Task>(API_ENDPOINTS.TASKS.BY_ID(id), { done });
    return response.data;
  }
};
