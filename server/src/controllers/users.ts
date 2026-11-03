import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';
import User from '../models/user.js';
import {
  DUPLICATE_KEY_CODE,
  JWT_EXPIRES_IN,
  MESSAGES,
  MIN_PASSWORD_LENGTH,
  SALT_ROUNDS,
} from '../utils/constants.js';
import { httpError } from '../utils/http-error.js';

type UserDocument = InstanceType<typeof User>;

// El hash no sale nunca en una respuesta
const toAccount = (user: UserDocument) => ({
  _id: user._id,
  email: user.email,
  name: user.name,
});

// Solo cadenas: un objeto como { "$gt": "" } llegaría a la consulta como operador
const readCredentials = (body: Request['body']) => {
  const { email, password } = body;
  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    throw httpError(400, MESSAGES.credentialsRequired);
  }
  return { email: email.trim().toLowerCase(), password };
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = readCredentials(req.body);
  const { name } = req.body;

  if (typeof name !== 'string' || !name.trim()) throw httpError(400, MESSAGES.nameRequired);
  // Va aquí y no en el esquema: ahí el valor ya es el hash, que siempre mide 60 caracteres
  if (password.length < MIN_PASSWORD_LENGTH) throw httpError(400, MESSAGES.passwordTooShort);

  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const user = await User.create({ email, password: hash, name: name.trim() });
    res.status(201).send(toAccount(user));
  } catch (err) {
    if ((err as { code?: number }).code === DUPLICATE_KEY_CODE) {
      throw httpError(409, MESSAGES.emailTaken);
    }
    throw err;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = readCredentials(req.body);

  const user = await User.findOne({ email }).select('+password');
  // La misma respuesta en los dos casos: así no se averigua qué correos están registrados
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw httpError(401, MESSAGES.wrongCredentials);
  }

  const token = jwt.sign({ _id: user._id.toString() }, jwtSecret, { expiresIn: JWT_EXPIRES_IN });
  res.send({ token, user: toAccount(user) });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id);
  if (!user) throw httpError(404, MESSAGES.userNotFound);
  res.send(toAccount(user));
};
