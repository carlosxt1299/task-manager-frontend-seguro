import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import type { TaskFormData, Task } from '../../types';
import { MESSAGES } from '../../utils/constants';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
  task?: Task | null;
  isLoading: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  isLoading,
}) => {
  const [submitError, setSubmitError] = useState<string>('');
  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
    },
  });

  // Reset form when task changes or modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      reset({
        title: task?.title || '',
        description: task?.description || '',
      });
      setSubmitError('');
    }
  }, [task, isOpen, reset]);

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      setSubmitError('');
      await onSubmit(data);
      onClose();
      reset();
    } catch (error: any) {
      setSubmitError(error.message || 'Error al procesar la tarea');
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setSubmitError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 bg-[#D98E04]/10 p-4 rounded-xl border border-[#D98E04]/20">
        <Input
          label="Título"
          {...register('title', {
            required: MESSAGES.VALIDATION.REQUIRED_FIELD,
            maxLength: {
              value: 100,
              message: MESSAGES.VALIDATION.TITLE_MAX_LENGTH,
            },
          })}
          error={errors.title?.message}
          placeholder="Ingresa el título de la tarea"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción (opcional)
          </label>
          <textarea
            {...register('description', {
              maxLength: {
                value: 500,
                message: MESSAGES.VALIDATION.DESCRIPTION_MAX_LENGTH,
              },
            })}
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Describe la tarea (opcional)"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        {submitError && (
          <div className="text-red-600 text-sm" role="alert">
            {submitError}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="font-sans border-primary text-[#D92B4B] hover:bg-[#F2BD1D]/20 hover:text-[#73462D]"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="bg-primary text-white font-sans hover:bg-primary/90 shadow"
          >
            {isEditing ? 'Actualizar' : 'Crear'} Tarea
          </Button>
        </div>
      </form>
    </Modal>
  );
};
