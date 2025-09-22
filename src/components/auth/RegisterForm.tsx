import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { RegisterFormData } from '../../types';
import { ROUTES, MESSAGES } from '../../utils/constants';

export const RegisterForm: React.FC = () => {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setSubmitError('');
      await registerUser(data.name, data.email, data.password);
      navigate(ROUTES.TASKS);
    } catch (error: any) {
      setSubmitError(error.message || MESSAGES.ERROR.REGISTER_FAILED);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              inicia sesión si ya tienes cuenta
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Nombre"
              type="text"
              autoComplete="name"
              {...register('name', {
                required: MESSAGES.VALIDATION.REQUIRED_FIELD,
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres',
                },
              })}
              error={errors.name?.message}
            />

            <Input
              label="Email"
              type="email"
              autoComplete="email"
              {...register('email', {
                required: MESSAGES.VALIDATION.REQUIRED_FIELD,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: MESSAGES.VALIDATION.INVALID_EMAIL,
                },
              })}
              error={errors.email?.message}
            />

            <Input
              label="Contraseña"
              type="password"
              autoComplete="new-password"
              {...register('password', {
                required: MESSAGES.VALIDATION.REQUIRED_FIELD,
                minLength: {
                  value: 6,
                  message: MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH,
                },
              })}
              error={errors.password?.message}
            />

            <Input
              label="Confirmar Contraseña"
              type="password"
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: MESSAGES.VALIDATION.REQUIRED_FIELD,
                validate: (value) =>
                  value === password || MESSAGES.VALIDATION.PASSWORDS_DONT_MATCH,
              })}
              error={errors.confirmPassword?.message}
            />
          </div>

          {submitError && (
            <div className="text-red-600 text-sm text-center" role="alert">
              {submitError}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Crear Cuenta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
