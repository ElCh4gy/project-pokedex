import cors from 'cors';
import express from 'express';
import { clientOrigin, port } from './config.js';
import { connectDB } from './db.js';
import { errorHandler } from './middleware/error-handler.js';
import router from './routes/index.js';

const app = express();

// La plataforma pone un proxy delante: la IP real llega en X-Forwarded-For
app.set('trust proxy', 1);

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

// Express 5 deja req.body sin definir si la petición no trae cuerpo
app.use((req, _res, next) => {
  req.body ??= {};
  next();
});

app.get('/health', (_req, res) => {
  res.send({ status: 'ok' });
});

// En serverless no hay arranque previo: la conexión se abre con la primera petición
app.use(async (_req, _res, next) => {
  await connectDB();
  next();
});

app.use(router);
app.use(errorHandler);

if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(port, (err) => {
        if (err) {
          console.error(`No se pudo escuchar en el puerto ${port}`, err);
          process.exit(1);
        }
        console.log(`Servidor ejecutándose en el puerto ${port}`);
      });
    })
    .catch((err: unknown) => {
      console.error('Error de conexión con MongoDB', err);
      process.exit(1);
    });
}

export default app;
