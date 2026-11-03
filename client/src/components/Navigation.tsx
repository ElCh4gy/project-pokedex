import { NavLink } from 'react-router-dom';
import '../styles/navigation.css';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `navigation__link ${isActive ? 'navigation__link_active' : ''}`;

function Navigation() {
  return (
    <nav className="navigation" aria-label="Principal">
      <NavLink className={getLinkClass} to="/" end>
        Inicio
      </NavLink>
      <NavLink className={getLinkClass} to="/about">
        Sobre el autor
      </NavLink>
    </nav>
  );
}

export default Navigation;
