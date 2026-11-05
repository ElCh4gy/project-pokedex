import { CATALOG_STORAGE_KEY } from './constants';
import type { StoredCatalog } from './types';

export const readStoredCatalog = (): StoredCatalog | null => {
  try {
    const stored = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (!stored) return null;
    const catalog = JSON.parse(stored) as StoredCatalog;
    return Array.isArray(catalog.pokemon) ? catalog : null;
  } catch {
    return null;
  }
};

export const saveCatalog = (catalog: StoredCatalog): void => {
  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
  } catch {
    // Sin almacenamiento disponible, la aplicación sigue funcionando sin recordar la búsqueda
  }
};
