# Pokédex

Aplicación para buscar Pokémon por nombre o número y consultar sus tipos, altura y peso. Es el proyecto final del programa de desarrollo web de TripleTen. Los datos vienen de [PokeAPI](https://pokeapi.co/docs/v2).

## Funcionalidad

- Catálogo que se muestra de 12 en 12, con el botón «Mostrar más».
- Búsqueda por parte del nombre (`char`) o por número exacto (`25` o `#25`).
- Indicador de carga, aviso cuando no hay resultados y mensaje de error si la petición falla.
- La última búsqueda se conserva en `localStorage` entre visitas.
- Diseño adaptable desde 320 px.

## Tecnologías

- React, TypeScript y Vite
- React Router
- `fetch` y PokeAPI
- CSS con flexbox y grid, normalize.css y fuentes locales

## Uso

```bash
cd client
npm install
npm run dev     # servidor de desarrollo
npm run build   # compila la aplicación
npm run lint    # revisa el código
```

PokeAPI no necesita clave, así que esta parte no usa variables de entorno.

## Estructura

```
client/src/
├── components/  componentes de React
├── hooks/       estado del catálogo
├── images/      imágenes e iconos SVG
├── styles/      estilos de cada componente
├── utils/       peticiones a PokeAPI, tipos, constantes y utilidades
└── vendor/      normalize.css y fuentes
```
