import type { Request, Response } from 'express';
import Favorite from '../models/favorite.js';
import { DUPLICATE_KEY_CODE, MESSAGES } from '../utils/constants.js';
import { httpError } from '../utils/http-error.js';

export const getFavorites = async (req: Request, res: Response) => {
  const favorites = await Favorite.find({ owner: req.user?._id as string }).sort({ createdAt: -1 });
  res.send(favorites);
};

export const createFavorite = async (req: Request, res: Response) => {
  const { pokemonId, name, image, types, heightInMeters, weightInKilograms } = req.body;

  if (!Number.isInteger(pokemonId) || typeof name !== 'string' || !name) {
    throw httpError(400, MESSAGES.favoriteDataRequired);
  }

  try {
    const favorite = await Favorite.create({
      pokemonId,
      name,
      // Algunos Pokémon no tienen imagen en PokeAPI
      image: image ?? undefined,
      types,
      heightInMeters,
      weightInKilograms,
      owner: req.user?._id as string,
    });
    res.status(201).send(favorite);
  } catch (err) {
    if ((err as { code?: number }).code === DUPLICATE_KEY_CODE) {
      throw httpError(409, MESSAGES.favoriteExists);
    }
    throw err;
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const favorite = await Favorite.findById(req.params.id);
  if (!favorite) throw httpError(404, MESSAGES.favoriteNotFound);
  if (favorite.owner.toString() !== req.user?._id) {
    throw httpError(403, MESSAGES.favoriteForbidden);
  }
  await favorite.deleteOne();
  res.send(favorite);
};
