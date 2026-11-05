import { request } from './request';
import type { Account, Credentials, Registration, SigninResponse } from './types';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const register = (data: Registration): Promise<Account> =>
  request<Account>('/signup', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });

export const authorize = (data: Credentials): Promise<SigninResponse> =>
  request<SigninResponse>('/signin', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });
