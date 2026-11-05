import { POKEAPI_URL, POKEMON_INDEX_LIMIT } from './constants';
import type {
  NamedResource,
  Pokemon,
  PokemonIndexEntry,
  PokemonListResponse,
  PokemonResponse,
} from './types';

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${POKEAPI_URL}${path}`);
  if (!response.ok) {
    throw new Error(`PokeAPI respondió con el estado ${response.status}`);
  }
  return response.json() as Promise<T>;
};

const toIndexEntry = ({ name, url }: NamedResource): PokemonIndexEntry => ({
  name,
  id: Number(url.split('/').filter(Boolean).pop()),
});

const toPokemon = (data: PokemonResponse): Pokemon => ({
  id: data.id,
  name: data.name,
  image: data.sprites.other?.['official-artwork']?.front_default ?? data.sprites.front_default,
  types: data.types.map(({ type }) => type.name),
  heightInMeters: data.height / 10,
  weightInKilograms: data.weight / 10,
});

let indexRequest: Promise<PokemonIndexEntry[]> | null = null;

// PokeAPI no busca por coincidencia parcial: se pide el índice de nombres una vez y se filtra aquí
export const getPokemonIndex = (): Promise<PokemonIndexEntry[]> => {
  indexRequest ??= request<PokemonListResponse>(`/pokemon?limit=${POKEMON_INDEX_LIMIT}`)
    .then(({ results }) => results.map(toIndexEntry))
    .catch((error: unknown) => {
      indexRequest = null;
      throw error;
    });
  return indexRequest;
};

export const filterPokemonIndex = (
  index: PokemonIndexEntry[],
  query: string,
): PokemonIndexEntry[] => {
  const term = query.trim().toLowerCase().replace(/\s+/g, '-');
  if (!term) return index;
  if (/^#?\d+$/.test(term)) {
    const id = Number(term.replace('#', ''));
    return index.filter((entry) => entry.id === id);
  }
  return index.filter((entry) => entry.name.includes(term));
};

export const getPokemonDetails = (entries: PokemonIndexEntry[]): Promise<Pokemon[]> =>
  Promise.all(
    entries.map(({ id }) => request<PokemonResponse>(`/pokemon/${id}`).then(toPokemon)),
  );
