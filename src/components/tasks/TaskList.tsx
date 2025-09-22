import React, { useMemo } from 'react';
import { TaskItem } from './TaskItem';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { Task, TaskFilter } from '../../types';
import { TASK_FILTERS } from '../../utils/constants';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggleTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => Promise<void>;
  isLoading: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  isLoading,
}) => {
  // Filter tasks based on current filter
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case TASK_FILTERS.COMPLETED:
        return tasks.filter(task => task.done);
      case TASK_FILTERS.PENDING:
        return tasks.filter(task => !task.done);
      case TASK_FILTERS.ALL:
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Sort tasks: incomplete first, then by creation date (newest first)
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // First sort by completion status (incomplete tasks first)
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }
      // Then sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredTasks]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (sortedTasks.length === 0) {
    const emptyMessages = {
      [TASK_FILTERS.ALL]: 'No tienes tareas aún. ¡Crea tu primera tarea!',
      [TASK_FILTERS.COMPLETED]: 'No tienes tareas completadas aún.',
      [TASK_FILTERS.PENDING]: 'No tienes tareas pendientes. ¡Buen trabajo!',
    };

    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {filter === TASK_FILTERS.ALL ? 'No hay tareas' : 
           filter === TASK_FILTERS.COMPLETED ? 'No hay tareas completadas' : 
           'No hay tareas pendientes'}
        </h3>
        <p className="text-gray-500">
          {emptyMessages[filter]}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-[#91E0F2]/20 rounded-xl p-4 border border-[#D92B4B]/10">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};
