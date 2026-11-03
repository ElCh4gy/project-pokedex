import { rateLimit } from 'express-rate-limit';
import { MESSAGES, SIGNIN_LIMIT, SIGNUP_LIMIT } from '../utils/constants.js';

const createLimiter = ({ windowMinutes, limit }: { windowMinutes: number; limit: number }) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: MESSAGES.tooManyRequests },
  });

export const signinLimiter = createLimiter(SIGNIN_LIMIT);
export const signupLimiter = createLimiter(SIGNUP_LIMIT);
