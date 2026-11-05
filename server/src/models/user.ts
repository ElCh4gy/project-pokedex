import mongoose from 'mongoose';
import { emailRegex } from '../utils/validation.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => emailRegex.test(value),
      message: 'El correo electrónico no es válido',
    },
  },
  // Guarda el hash, nunca la contraseña. Solo se lee si se pide con .select('+password')
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
