# Pokédex: API

API de Express, TypeScript y MongoDB. Guarda las cuentas y los Pokémon favoritos de cada persona.

## Rutas

Rutas abiertas:

| Método | Ruta      | Descripción                                                         |
| ------ | --------- | ------------------------------------------------------------------- |
| GET    | `/health` | Estado del servidor; no depende de la base ni de un token           |
| POST   | `/signup` | Crea la cuenta (`email`, `password` de 8+ caracteres, `name`)       |
| POST   | `/signin` | Devuelve `token` y `user`; el token expira en una semana            |

El resto requiere el encabezado `Authorization: Bearer <token>`:

| Método | Ruta             | Descripción                                                     |
| ------ | ---------------- | --------------------------------------------------------------- |
| GET    | `/users/me`      | Correo y nombre de quien tiene la sesión abierta                |
| GET    | `/favorites`     | Favoritos propios, del más reciente al más antiguo              |
| POST   | `/favorites`     | Guarda un Pokémon (`pokemonId`, `name` y datos para mostrarlo)  |
| DELETE | `/favorites/:id` | Elimina un favorito propio                                      |

## Códigos de error

- **400**: faltan datos, son inválidos o el id tiene mal formato
- **401**: token ausente o inválido; correo o contraseña incorrectos
- **403**: el favorito es de otra persona
- **404**: el recurso o la ruta no existen
- **409**: el correo ya está registrado o el Pokémon ya está en favoritos
- **429**: demasiados intentos en `/signup` o `/signin`
- **500**: error del servidor

## Uso

```bash
cp .env.example .env
npm install
npm run dev     # servidor con recarga
npm run build   # compila src/ a dist/
npm start       # ejecuta la versión compilada
npm run lint    # revisa el código
```

En desarrollo, el servidor arranca aunque falten datos:

- Si la base de `MONGO_URI` no responde, usa una base en memoria (`mongodb-memory-server`). La primera vez descarga el binario de MongoDB, y los datos se borran al detener el servidor.
- Si falta `JWT_SECRET`, genera una clave temporal y las sesiones se pierden al reiniciar.

En producción nunca hace esto: sin la clave o sin la base, falla.
