# Pokédex

Aplicación full stack para buscar Pokémon y guardar tus favoritos. Es el proyecto final del programa de desarrollo web de TripleTen. Los datos del catálogo vienen de [PokeAPI](https://pokeapi.co/docs/v2).

## Despliegue

- **Front end:** https://project-pokedex-client.vercel.app
- **API:** https://project-pokedex-api.vercel.app

**Aplicación desplegada:** https://project-pokedex-client.vercel.app

## Funcionalidad

- Catálogo que se muestra de 12 en 12, con el botón «Mostrar más».
- Búsqueda por parte del nombre (`char`) o por número exacto (`25` o `#25`).
- Indicador de carga, aviso cuando no hay resultados y mensaje de error si la petición falla.
- La última búsqueda se conserva en `localStorage` entre visitas.
- Registro e inicio de sesión contra una API propia, con la sesión restaurada al volver.
- Encabezado distinto según haya sesión o no.
- Página privada `/favorites`: cada persona guarda y elimina sus Pokémon, y solo ve los suyos.
- Diseño adaptable desde 320 px.

## Tecnologías

- **Front end:** React, TypeScript, Vite, React Router, CSS con flexbox y grid
- **Back end:** Node.js, Express, TypeScript, MongoDB, Mongoose, bcrypt, JSON Web Token, express-rate-limit
- **Servicios:** PokeAPI, Vercel y MongoDB Atlas

## Uso

```bash
npm run install:all   # instala client y server
npm run dev:server    # API en http://localhost:3001
npm run dev:client    # aplicación en http://localhost:5173
npm run build         # compila las dos partes
npm run lint          # revisa las dos partes
```

No hace falta configurar nada para probarlo en local: el cliente lee `client/.env.development`, y en desarrollo el servidor usa una base en memoria si no encuentra MongoDB. Para usar tus propios valores, copia `server/.env.example` a `server/.env`.

## Variables de entorno

| Parte  | Variable        | Descripción                             |
| ------ | --------------- | --------------------------------------- |
| server | `MONGO_URI`     | Cadena de conexión a MongoDB            |
| server | `PORT`          | Puerto del servidor                     |
| server | `CLIENT_ORIGIN` | Origen del front end permitido por CORS |
| server | `JWT_SECRET`    | Clave para firmar los tokens            |
| client | `VITE_API_URL`  | Dirección de la API (no es un secreto)  |

## Estructura

```
project-pokedex/
├── client/src/
│   ├── components/  componentes de React
│   ├── contexts/    usuario actual
│   ├── hooks/       catálogo, sesión, favoritos y avisos
│   ├── images/      imágenes e iconos SVG
│   ├── styles/      estilos de cada componente
│   ├── utils/       peticiones, tipos, constantes y utilidades
│   └── vendor/      normalize.css y fuentes
└── server/src/
    ├── controllers/ lógica de cada ruta
    ├── middleware/  autorización, limitadores y errores
    ├── models/      usuario y favorito
    ├── routes/      rutas por recurso
    └── utils/       constantes, errores y validación
```

Consulta las rutas de la API en [`server/README.md`](server/README.md).
