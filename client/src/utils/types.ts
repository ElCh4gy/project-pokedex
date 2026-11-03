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

export interface Account {
  _id: string;
  email: string;
  name: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Registration extends Credentials {
  name: string;
}

export interface SigninResponse {
  token: string;
  user: Account;
}

export interface Favorite {
  _id: string;
  pokemonId: number;
  name: string;
  image?: string;
  types: string[];
  heightInMeters?: number;
  weightInKilograms?: number;
  owner: string;
  createdAt: string;
}

export interface FavoriteInput {
  pokemonId: number;
  name: string;
  image: string | null;
  types: string[];
  heightInMeters: number;
  weightInKilograms: number;
}

export type FavoritesStatus = 'loading' | 'ready' | 'error';

export interface NoticeData {
  text: string;
  isError: boolean;
}
