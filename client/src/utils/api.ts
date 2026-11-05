import { request } from './request';
import { getToken } from './token';
import type { Account, Favorite, FavoriteInput, Pokemon } from './types';

// El token se lee en cada petición: cambia al iniciar y al cerrar sesión
const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const getCurrentUser = (): Promise<Account> =>
  request<Account>('/users/me', { headers: getHeaders() });

export const getFavorites = (): Promise<Favorite[]> =>
  request<Favorite[]>('/favorites', { headers: getHeaders() });

export const addFavorite = (data: FavoriteInput): Promise<Favorite> =>
  request<Favorite>('/favorites', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

export const removeFavorite = (id: string): Promise<Favorite> =>
  request<Favorite>(`/favorites/${id}`, { method: 'DELETE', headers: getHeaders() });

export const toFavoriteInput = (pokemon: Pokemon): FavoriteInput => ({
  pokemonId: pokemon.id,
  name: pokemon.name,
  image: pokemon.image,
  types: pokemon.types,
  heightInMeters: pokemon.heightInMeters,
  weightInKilograms: pokemon.weightInKilograms,
});

export const favoriteToPokemon = (favorite: Favorite): Pokemon => ({
  id: favorite.pokemonId,
  name: favorite.name,
  image: favorite.image ?? null,
  types: favorite.types,
  heightInMeters: favorite.heightInMeters ?? 0,
  weightInKilograms: favorite.weightInKilograms ?? 0,
});
