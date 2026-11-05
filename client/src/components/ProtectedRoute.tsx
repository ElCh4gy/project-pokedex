import { useContext, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Preloader from './Preloader';

interface ProtectedRouteProps {
  children: ReactNode;
  isCheckingSession: boolean;
  isGuestOnly?: boolean;
}

function ProtectedRoute({ children, isCheckingSession, isGuestOnly = false }: ProtectedRouteProps) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  if (isCheckingSession) {
    return (
      <main className="main">
        <Preloader />
      </main>
    );
  }

  if (isGuestOnly && currentUser) {
    const from = (location.state as { from?: string } | null)?.from ?? '/';
    return <Navigate to={from} replace />;
  }

  if (!isGuestOnly && !currentUser) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
