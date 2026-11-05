export const SALT_ROUNDS = 10;
export const MIN_PASSWORD_LENGTH = 8;
export const JWT_EXPIRES_IN = '7d';
export const DUPLICATE_KEY_CODE = 11000;

export const MAX_POOL_SIZE = 5;
export const SERVER_SELECTION_TIMEOUT_MS = 5000;

export const SIGNIN_LIMIT = { windowMinutes: 15, limit: 10 };
export const SIGNUP_LIMIT = { windowMinutes: 60, limit: 10 };

export const MESSAGES = {
  serverError: 'Ha ocurrido un error en el servidor',
  invalidData: 'Los datos enviados no son válidos',
  invalidJson: 'El cuerpo de la petición no es un JSON válido',
  credentialsRequired: 'Se requieren el correo y la contraseña',
  nameRequired: 'Se requiere el nombre',
  passwordTooShort: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`,
  emailTaken: 'Ya existe una cuenta con ese correo',
  wrongCredentials: 'Correo o contraseña incorrectos',
  authRequired: 'Se requiere autorización',
  userNotFound: 'No se encontró el usuario',
  routeNotFound: 'Recurso solicitado no encontrado',
  favoriteDataRequired: 'Se requieren el número y el nombre del Pokémon',
  favoriteExists: 'Este Pokémon ya está en tus favoritos',
  favoriteNotFound: 'No se encontró ese favorito',
  favoriteForbidden: 'No tienes permiso para eliminar este favorito',
  tooManyRequests: 'Demasiadas solicitudes, inténtalo más tarde',
};
