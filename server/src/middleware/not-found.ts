import { MESSAGES } from '../utils/constants.js';
import { httpError } from '../utils/http-error.js';

export const notFound = (): never => {
  throw httpError(404, MESSAGES.routeNotFound);
};
