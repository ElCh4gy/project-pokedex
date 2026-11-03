import mongoose from 'mongoose';
import { isProduction, mongoUri } from './config.js';
import Favorite from './models/favorite.js';
import User from './models/user.js';
import { MAX_POOL_SIZE, SERVER_SELECTION_TIMEOUT_MS } from './utils/constants.js';

const connectOptions = {
  maxPoolSize: MAX_POOL_SIZE,
  serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
};

const connectInMemory = async (): Promise<void> => {
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const memoryServer = await MongoMemoryServer.create();
  await mongoose.connect(memoryServer.getUri('pokedex'), connectOptions);
  console.log('Conectado a MongoDB en memoria (los datos se borran al detener el servidor)');
};

const openConnection = async (): Promise<void> => {
  try {
    if (!mongoUri) throw new Error('Falta MONGO_URI');
    await mongoose.connect(mongoUri, connectOptions);
    console.log('Conectado a MongoDB');
  } catch (err) {
    if (isProduction) throw err;
    console.warn('No se pudo usar MONGO_URI; se inicia una base de datos en memoria...');
    await connectInMemory();
  }

  // Los índices únicos deben existir antes de atender peticiones
  await Promise.all([User.init(), Favorite.init()]);
};

let connection: Promise<void> | null = null;

// Todas las peticiones comparten la conexión; si falló, la siguiente lo reintenta
export const connectDB = (): Promise<void> => {
  connection ??= openConnection().catch((err: unknown) => {
    connection = null;
    throw err;
  });
  return connection;
};
