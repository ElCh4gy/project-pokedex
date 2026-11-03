import { NOT_FOUND_MESSAGE, REQUEST_ERROR_MESSAGE } from '../utils/constants';
import type { CatalogStatus, Pokemon } from '../utils/types';
import '../styles/main.css';
import PokemonCard from './PokemonCard';
import Preloader from './Preloader';
import SearchForm from './SearchForm';
import StatusMessage from './StatusMessage';

interface MainProps {
  query: string;
  pokemon: Pokemon[];
  total: number;
  status: CatalogStatus;
  onSearch: (term: string) => void;
  onShowMore: () => void;
}

function Main({ query, pokemon, total, status, onSearch, onShowMore }: MainProps) {
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
            <ul className="main__grid">
              {pokemon.map((item) => (
                <li key={item.id}>
                  <PokemonCard pokemon={item} />
                </li>
              ))}
            </ul>
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
