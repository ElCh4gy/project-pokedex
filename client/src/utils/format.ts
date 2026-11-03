export const formatPokemonName = (name: string): string =>
  name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const formatDexNumber = (id: number): string => `#${String(id).padStart(4, '0')}`;

export const formatMeasure = (value: number, unit: string): string =>
  `${value.toLocaleString('es')} ${unit}`;
