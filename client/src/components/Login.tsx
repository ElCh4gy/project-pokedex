import { Link } from 'react-router-dom';
import type { Credentials } from '../utils/types';
import AuthForm from './AuthForm';

interface LoginProps {
  onSubmit: (data: Credentials) => Promise<void>;
}

function Login({ onSubmit }: LoginProps) {
  return (
    <AuthForm
      title="Iniciar sesión"
      submitLabel="Iniciar sesión"
      submittingLabel="Iniciando sesión..."
      onSubmit={({ email, password }) => onSubmit({ email, password })}
      footer={
        <>
          ¿Aún no tienes cuenta? <Link to="/signup">Regístrate</Link>
        </>
      }
    />
  );
}

export default Login;
