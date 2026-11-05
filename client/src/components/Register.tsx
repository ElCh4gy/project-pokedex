import { Link } from 'react-router-dom';
import type { Registration } from '../utils/types';
import AuthForm from './AuthForm';

interface RegisterProps {
  onSubmit: (data: Registration) => Promise<void>;
}

function Register({ onSubmit }: RegisterProps) {
  return (
    <AuthForm
      title="Crear cuenta"
      submitLabel="Registrarse"
      submittingLabel="Registrando..."
      withName
      onSubmit={onSubmit}
      footer={
        <>
          ¿Ya tienes cuenta? <Link to="/signin">Inicia sesión</Link>
        </>
      }
    />
  );
}

export default Register;
