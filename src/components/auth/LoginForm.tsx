import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { LoginFormData } from '../../types';
import { ROUTES, MESSAGES } from '../../utils/constants';

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setSubmitError('');
      await login(data.email, data.password);
      navigate(ROUTES.TASKS);
    } catch (error: any) {
      setSubmitError(error.message || MESSAGES.ERROR.LOGIN_FAILED);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link
              to={ROUTES.REGISTER}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              regístrate si no tienes cuenta
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
              autoComplete="current-password"
              {...register('password', {
                required: MESSAGES.VALIDATION.REQUIRED_FIELD,
                minLength: {
                  value: 6,
                  message: MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH,
                },
              })}
              error={errors.password?.message}
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
              Iniciar Sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
