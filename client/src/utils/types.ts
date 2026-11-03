export interface NamedResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: NamedResource[];
}

export interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: NamedResource }[];
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: { front_default: string | null };
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  image: string | null;
  types: string[];
  heightInMeters: number;
  weightInKilograms: number;
}

export interface PokemonIndexEntry {
  id: number;
  name: string;
}

export interface StoredCatalog {
  query: string;
  total: number;
  pokemon: Pokemon[];
}

export type CatalogStatus = 'loading' | 'loading-more' | 'ready' | 'error' | 'more-error';
