import { useEffect, useState } from 'react';
import { getCurrentUser } from '../utils/api';
import { authorize, register } from '../utils/auth';
import { ApiError } from '../utils/request';
import { getToken, removeToken, saveToken } from '../utils/token';
import type { Account, Credentials, Registration } from '../utils/types';

export const useSession = () => {
  const [currentUser, setCurrentUser] = useState<Account | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(() => Boolean(getToken()));

  useEffect(() => {
    if (!getToken()) return undefined;
    let isActive = true;
    getCurrentUser()
      .then((user) => {
        if (isActive) setCurrentUser(user);
      })
      .catch((err: unknown) => {
        // Un fallo de red no invalida el token: solo se borra si el servidor lo rechaza
        if (err instanceof ApiError && (err.status === 401 || err.status === 404)) removeToken();
      })
      .finally(() => {
        if (isActive) setIsCheckingSession(false);
      });
    return () => {
      isActive = false;
    };
  }, []);

  const signUp = async (data: Registration): Promise<void> => {
    await register(data);
  };

  const signIn = async (data: Credentials): Promise<void> => {
    const { token, user } = await authorize(data);
    saveToken(token);
    setCurrentUser(user);
  };

  const signOut = (): void => {
    removeToken();
    setCurrentUser(null);
  };

  return { currentUser, isCheckingSession, signUp, signIn, signOut };
};
