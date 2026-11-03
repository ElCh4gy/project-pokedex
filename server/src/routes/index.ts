import { Router } from 'express';
import { createUser, login } from '../controllers/users.js';
import auth from '../middleware/auth.js';
import { notFound } from '../middleware/not-found.js';
import { signinLimiter, signupLimiter } from '../middleware/rate-limit.js';
import favoritesRouter from './favorites.js';
import usersRouter from './users.js';

const router = Router();

// Rutas abiertas: son justamente las que entregan el token
router.post('/signup', signupLimiter, createUser);
router.post('/signin', signinLimiter, login);

// Todo lo que viene después requiere un token válido
router.use(auth);
router.use('/users', usersRouter);
router.use('/favorites', favoritesRouter);
router.use(notFound);

export default router;
