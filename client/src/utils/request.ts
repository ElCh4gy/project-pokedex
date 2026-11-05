import { API_URL, REQUEST_ERROR_MESSAGE } from './constants';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, options);
  } catch {
    throw new ApiError(0, REQUEST_ERROR_MESSAGE);
  }

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = (data as { message?: string } | null)?.message;
    throw new ApiError(response.status, message ?? REQUEST_ERROR_MESSAGE);
  }
  return data as T;
};
