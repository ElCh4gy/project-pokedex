import 'dotenv/config';
import { randomBytes } from 'node:crypto';

export const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);

const readJwtSecret = (): string => {
  const { JWT_SECRET } = process.env;
  if (JWT_SECRET) return JWT_SECRET;
  if (isProduction) throw new Error('Falta la variable de entorno JWT_SECRET');
  console.warn('Falta JWT_SECRET: se usa una clave temporal y las sesiones se pierden al reiniciar');
  return randomBytes(32).toString('hex');
};

export const jwtSecret = readJwtSecret();
export const mongoUri = process.env.MONGO_URI;
export const port = Number(process.env.PORT ?? 3001);
export const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';
