import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';
import { MESSAGES } from '../utils/constants.js';
import { httpError } from '../utils/http-error.js';

const unauthorized = () => httpError(401, MESSAGES.authRequired);

export default function auth(req: Request, _res: Response, next: NextFunction): void {
  const [scheme, token] = req.headers.authorization?.split(' ') ?? [];
  if (scheme !== 'Bearer' || !token) throw unauthorized();

  let payload: string | jwt.JwtPayload;
  try {
    payload = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
  } catch {
    throw unauthorized();
  }

  if (typeof payload === 'string' || typeof payload._id !== 'string') throw unauthorized();

  req.user = { _id: payload._id };
  next();
}
