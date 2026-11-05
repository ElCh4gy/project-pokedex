import type { ReactNode } from 'react';
import type { Pokemon } from '../utils/types';
import '../styles/pokemon-grid.css';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemon: Pokemon[];
  renderAction?: (item: Pokemon) => ReactNode;
}

function PokemonGrid({ pokemon, renderAction }: PokemonGridProps) {
  return (
    <ul className="pokemon-grid">
      {pokemon.map((item) => (
        <li key={item.id}>
          <PokemonCard pokemon={item}>{renderAction?.(item)}</PokemonCard>
        </li>
      ))}
    </ul>
  );
}

export default PokemonGrid;
