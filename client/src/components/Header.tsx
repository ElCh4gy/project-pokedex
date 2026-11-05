import { Link } from 'react-router-dom';
import lens from '../images/lens.svg';
import '../styles/header.css';
import Navigation from './Navigation';

interface HeaderProps {
  isBusy: boolean;
}

function Header({ isBusy }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__shell">
        <Link className="header__brand" to="/">
          <img className="header__lens" src={lens} alt="" width="64" height="64" />
          <span className="header__title">Pokédex</span>
        </Link>
        <div
          className={`header__leds ${isBusy ? 'header__leds_active' : ''}`}
          aria-hidden="true"
        >
          <span className="header__led header__led_color_red" />
          <span className="header__led header__led_color_yellow" />
          <span className="header__led header__led_color_green" />
        </div>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
