import { useEffect, useState } from 'react';
import * as api from '../utils/api';
import type { Favorite, FavoritesStatus, Pokemon } from '../utils/types';

export const useFavorites = (userId: string | undefined) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [status, setStatus] = useState<FavoritesStatus>('loading');

  useEffect(() => {
    if (!userId) return undefined;
    let isActive = true;
    api
      .getFavorites()
      .then((items) => {
        if (!isActive) return;
        setFavorites(items);
        setStatus('ready');
      })
      .catch(() => {
        if (isActive) setStatus('error');
      });
    return () => {
      isActive = false;
    };
  }, [userId]);

  const addFavorite = async (pokemon: Pokemon): Promise<void> => {
    const favorite = await api.addFavorite(api.toFavoriteInput(pokemon));
    setFavorites((items) => [favorite, ...items]);
  };

  const removeFavorite = async (id: string): Promise<void> => {
    await api.removeFavorite(id);
    setFavorites((items) => items.filter((item) => item._id !== id));
  };

  const clearFavorites = (): void => {
    setFavorites([]);
    setStatus('loading');
  };

  return { favorites, status, addFavorite, removeFavorite, clearFavorites };
};
