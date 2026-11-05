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

// Cada recurso exige un token válido; una ruta que no existe responde 404 con o sin token
router.use('/users', auth, usersRouter);
router.use('/favorites', auth, favoritesRouter);
router.use(notFound);

export default router;
