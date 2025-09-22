import React, { useState } from 'react';
import type { Task } from '../../types';
import { Button } from '../ui/Button';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      setIsDeleting(true);
      try {
        await onDelete(task.id);
      } catch (error) {
        // Error is handled by the parent component
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
  <div className={`rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border ${task.done ? 'bg-[#91E0F2]/40 border-[#91E0F2]' : 'bg-[#F2BD1D]/20 border-[#F2BD1D]/40'}` }>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Checkbox */}
          <button
            onClick={handleToggle}
            className="mt-1 flex-shrink-0"
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                task.done
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300 hover:border-primary-600'
              }`}
            >
              {task.done && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium ${task.done ? 'line-through text-[#73462D]/60' : 'text-[#73462D]'}`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`mt-1 text-sm ${task.done ? 'line-through text-[#73462D]/40' : 'text-[#73462D]/80'}`}
              >
                {task.description}
              </p>
            )}
            <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
              <span>Creado: {formatDate(task.createdAt)}</span>
              {task.updatedAt !== task.createdAt && (
                <span>Actualizado: {formatDate(task.updatedAt)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            size="sm"
            variant="outline"
            onClick={handleEdit}
            disabled={isDeleting}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
            disabled={isDeleting}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};
