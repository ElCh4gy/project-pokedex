import { useState, type FormEvent } from 'react';
import '../styles/search-form.css';

interface SearchFormProps {
  query: string;
  onSearch: (term: string) => void;
}

function SearchForm({ query, onSearch }: SearchFormProps) {
  const [term, setTerm] = useState<string>(query);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(term);
  };

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <label className="search-form__label" htmlFor="pokemon-search">
        Nombre o número
      </label>
      <div className="search-form__controls">
        <input
          className="search-form__input"
          id="pokemon-search"
          type="search"
          placeholder="pikachu o 25"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          required
        />
        <button className="search-form__submit" type="submit">
          Buscar
        </button>
        {query && (
          <button className="search-form__clear" type="button" onClick={() => onSearch('')}>
            Ver todos
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchForm;
