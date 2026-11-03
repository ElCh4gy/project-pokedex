import { createContext } from 'react';
import type { Account } from '../utils/types';

const CurrentUserContext = createContext<Account | null>(null);

export default CurrentUserContext;
