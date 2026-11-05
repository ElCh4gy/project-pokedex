import { TOKEN_STORAGE_KEY } from './constants';

export const getToken = (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY);

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
