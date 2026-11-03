import { useCallback, useEffect, useRef, useState } from 'react';
import { readStoredCatalog, saveCatalog } from '../utils/catalogStorage';
import { PAGE_SIZE } from '../utils/constants';
import { filterPokemonIndex, getPokemonDetails, getPokemonIndex } from '../utils/pokeApi';
import type { CatalogStatus, Pokemon } from '../utils/types';

export const usePokedex = () => {
  const [storedCatalog] = useState(readStoredCatalog);
  const [query, setQuery] = useState<string>(storedCatalog?.query ?? '');
  const [pokemon, setPokemon] = useState<Pokemon[]>(storedCatalog?.pokemon ?? []);
  const [total, setTotal] = useState<number>(storedCatalog?.total ?? 0);
  const [status, setStatus] = useState<CatalogStatus>(storedCatalog ? 'ready' : 'loading');
  const latestRequest = useRef(0);

  const loadFirstPage = useCallback(async (term: string) => {
    const requestId = ++latestRequest.current;
    try {
      const matches = filterPokemonIndex(await getPokemonIndex(), term);
      const firstPage = await getPokemonDetails(matches.slice(0, PAGE_SIZE));
      if (requestId !== latestRequest.current) return;
      setPokemon(firstPage);
      setTotal(matches.length);
      setStatus('ready');
      saveCatalog({ query: term, total: matches.length, pokemon: firstPage });
    } catch {
      if (requestId === latestRequest.current) setStatus('error');
    }
  }, []);

  const search = (term: string) => {
    const nextQuery = term.trim();
    setQuery(nextQuery);
    setPokemon([]);
    setTotal(0);
    setStatus('loading');
    loadFirstPage(nextQuery);
  };

  const showMore = async () => {
    const requestId = ++latestRequest.current;
    setStatus('loading-more');
    try {
      const matches = filterPokemonIndex(await getPokemonIndex(), query);
      const nextPage = await getPokemonDetails(
        matches.slice(pokemon.length, pokemon.length + PAGE_SIZE),
      );
      if (requestId !== latestRequest.current) return;
      const visible = [...pokemon, ...nextPage];
      setPokemon(visible);
      setTotal(matches.length);
      setStatus('ready');
      saveCatalog({ query, total: matches.length, pokemon: visible });
    } catch {
      if (requestId === latestRequest.current) setStatus('more-error');
    }
  };

  useEffect(() => {
    if (!storedCatalog) loadFirstPage('');
    return () => {
      latestRequest.current += 1;
    };
  }, [storedCatalog, loadFirstPage]);

  return { query, pokemon, total, status, search, showMore };
};
