import mongoose from 'mongoose';
import { urlRegex } from '../utils/validation.js';

const favoriteSchema = new mongoose.Schema({
  pokemonId: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'El número del Pokémon debe ser un entero',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 60,
  },
  // Lo necesario para mostrar la tarjeta sin volver a pedirla a PokeAPI
  image: {
    type: String,
    validate: {
      validator: (value: string) => urlRegex.test(value),
      message: 'El enlace de la imagen debe ser válido',
    },
  },
  types: {
    type: [String],
    default: [],
  },
  heightInMeters: {
    type: Number,
    min: 0,
  },
  weightInKilograms: {
    type: Number,
    min: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Cada persona puede guardar cada Pokémon una sola vez
favoriteSchema.index({ owner: 1, pokemonId: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
