import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { NOT_FOUND_MESSAGE, REQUEST_ERROR_MESSAGE } from '../utils/constants';
import type { CatalogStatus, Pokemon } from '../utils/types';
import '../styles/main.css';
import ActionButton from './ActionButton';
import PokemonGrid from './PokemonGrid';
import Preloader from './Preloader';
import SearchForm from './SearchForm';
import StatusMessage from './StatusMessage';

interface MainProps {
  query: string;
  pokemon: Pokemon[];
  total: number;
  status: CatalogStatus;
  savedIds: Set<number>;
  isCheckingSession: boolean;
  onSearch: (term: string) => void;
  onShowMore: () => void;
  onSave: (item: Pokemon) => Promise<void>;
}

function Main({
  query,
  pokemon,
  total,
  status,
  savedIds,
  isCheckingSession,
  onSearch,
  onShowMore,
  onSave,
}: MainProps) {
  const currentUser = useContext(CurrentUserContext);
  const hasMore = pokemon.length < total;
  const isLoadingMore = status === 'loading-more';
  const isEmpty = status === 'ready' && total === 0;

  return (
    <main className="main">
      <section className="main__search" aria-labelledby="catalog-title">
        <h1 className="main__title" id="catalog-title">
          Encuentra cualquier Pokémon
        </h1>
        <SearchForm key={query} query={query} onSearch={onSearch} />
        {!currentUser && !isCheckingSession && (
          <p className="main__hint">
            <Link to="/signin">Inicia sesión</Link> para guardar tus Pokémon favoritos.
          </p>
        )}
      </section>

      <section className="main__results" aria-label="Resultados">
        {status === 'loading' && <Preloader />}
        {status === 'error' && <StatusMessage text={REQUEST_ERROR_MESSAGE} isError />}
        {isEmpty && <StatusMessage text={NOT_FOUND_MESSAGE} />}

        {pokemon.length > 0 && (
          <>
            <p className="main__count">
              {pokemon.length} de {total} Pokémon
            </p>
            <PokemonGrid
              pokemon={pokemon}
              renderAction={
                currentUser
                  ? (item) => {
                      const isSaved = savedIds.has(item.id);
                      return (
                        <ActionButton
                          label={isSaved ? 'Guardado' : 'Guardar'}
                          pendingLabel="Guardando..."
                          isDisabled={isSaved}
                          onClick={() => onSave(item)}
                        />
                      );
                    }
                  : undefined
              }
            />
          </>
        )}

        {isLoadingMore && <Preloader />}
        {status === 'more-error' && <StatusMessage text={REQUEST_ERROR_MESSAGE} isError />}
        {hasMore && !isLoadingMore && (
          <button className="main__more" type="button" onClick={onShowMore}>
            Mostrar más
          </button>
        )}
      </section>
    </main>
  );
}

export default Main;
