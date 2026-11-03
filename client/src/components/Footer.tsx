import { CURRENT_YEAR, POKEAPI_DOCS_URL } from '../utils/constants';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© {CURRENT_YEAR} Proyecto final de TripleTen</p>
      <a className="footer__link" href={POKEAPI_DOCS_URL} target="_blank" rel="noreferrer">
        Datos de PokeAPI
      </a>
    </footer>
  );
}

export default Footer;
