import type { NextFunction, Request, Response } from 'express';
import { MESSAGES } from '../utils/constants.js';

type AppError = Error & { statusCode?: number; type?: string };

const describeError = (err: AppError): { statusCode: number; message: string } => {
  // Los errores de Mongoose se resumen: su mensaje original expone detalles internos
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return { statusCode: 400, message: MESSAGES.invalidData };
  }
  if (err.type === 'entity.parse.failed') {
    return { statusCode: 400, message: MESSAGES.invalidJson };
  }
  const statusCode = err.statusCode ?? 500;
  return { statusCode, message: statusCode >= 500 ? MESSAGES.serverError : err.message };
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const { statusCode, message } = describeError(err);
  if (statusCode >= 500) console.error(err);
  res.status(statusCode).send({ message });
};
