import { useState, type FormEvent, type ReactNode } from 'react';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '../utils/constants';
import type { Registration } from '../utils/types';
import '../styles/auth-form.css';

interface AuthFormProps {
  title: string;
  submitLabel: string;
  submittingLabel: string;
  withName?: boolean;
  footer: ReactNode;
  onSubmit: (data: Registration) => Promise<void>;
}

function AuthForm({
  title,
  submitLabel,
  submittingLabel,
  withName = false,
  footer,
  onSubmit,
}: AuthFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit({ email, password, name });
    } catch (err) {
      setError(err instanceof Error ? err.message : '');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-form">
      <h1 className="auth-form__title">{title}</h1>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        {withName && (
          <label className="auth-form__field">
            Nombre
            <input
              className="auth-form__input"
              type="text"
              placeholder="Tu nombre"
              autoComplete="name"
              minLength={MIN_NAME_LENGTH}
              maxLength={MAX_NAME_LENGTH}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        )}
        <label className="auth-form__field">
          Correo electrónico
          <input
            className="auth-form__input"
            type="email"
            placeholder="correo@ejemplo.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="auth-form__field">
          Contraseña
          <input
            className="auth-form__input"
            type="password"
            placeholder={withName ? `Al menos ${MIN_PASSWORD_LENGTH} caracteres` : 'Tu contraseña'}
            autoComplete={withName ? 'new-password' : 'current-password'}
            minLength={withName ? MIN_PASSWORD_LENGTH : undefined}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error && (
          <p className="auth-form__error" role="alert">
            {error}
          </p>
        )}
        <button className="auth-form__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </form>
      <p className="auth-form__footer">{footer}</p>
    </main>
  );
}

export default AuthForm;
