import { Link } from 'react-router-dom';
import { favoriteToPokemon } from '../utils/api';
import { NO_FAVORITES_MESSAGE, REQUEST_ERROR_MESSAGE } from '../utils/constants';
import type { Favorite, FavoritesStatus } from '../utils/types';
import '../styles/main.css';
import ActionButton from './ActionButton';
import PokemonGrid from './PokemonGrid';
import Preloader from './Preloader';
import StatusMessage from './StatusMessage';

interface FavoritesProps {
  favorites: Favorite[];
  status: FavoritesStatus;
  onRemove: (item: Favorite) => Promise<void>;
}

function Favorites({ favorites, status, onRemove }: FavoritesProps) {
  const byPokemonId = new Map(favorites.map((item) => [item.pokemonId, item]));

  return (
    <main className="main">
      <h1 className="main__title">Mis favoritos</h1>
      {status === 'loading' && <Preloader />}
      {status === 'error' && <StatusMessage text={REQUEST_ERROR_MESSAGE} isError />}
      {status === 'ready' && favorites.length === 0 && (
        <p className="main__hint">
          {NO_FAVORITES_MESSAGE} <Link to="/">Busca en el catálogo</Link> y pulsa «Guardar».
        </p>
      )}
      {favorites.length > 0 && (
        <PokemonGrid
          pokemon={favorites.map(favoriteToPokemon)}
          renderAction={(item) => {
            const favorite = byPokemonId.get(item.id);
            return (
              favorite && (
                <ActionButton
                  label="Eliminar"
                  pendingLabel="Eliminando..."
                  isSecondary
                  onClick={() => onRemove(favorite)}
                />
              )
            );
          }}
        />
      )}
    </main>
  );
}

export default Favorites;
