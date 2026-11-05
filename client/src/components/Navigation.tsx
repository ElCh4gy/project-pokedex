import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../styles/navigation.css';

interface NavigationProps {
  isCheckingSession: boolean;
  onSignOut: () => void;
}

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `navigation__link ${isActive ? 'navigation__link_active' : ''}`;

function Navigation({ isCheckingSession, onSignOut }: NavigationProps) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <nav className="navigation" aria-label="Principal">
      <NavLink className={getLinkClass} to="/" end>
        Inicio
      </NavLink>
      <NavLink className={getLinkClass} to="/about">
        Sobre el autor
      </NavLink>
      {currentUser && (
        <>
          <NavLink className={getLinkClass} to="/favorites">
            Mis favoritos
          </NavLink>
          <button className="navigation__link navigation__button" type="button" onClick={onSignOut}>
            Cerrar sesión
          </button>
        </>
      )}
      {!currentUser && !isCheckingSession && (
        <NavLink className={getLinkClass} to="/signin">
          Iniciar sesión
        </NavLink>
      )}
    </nav>
  );
}

export default Navigation;
