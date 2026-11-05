import placeholder from '../images/pokemon-placeholder.svg';
import { TYPE_LABELS } from '../utils/constants';
import { formatDexNumber, formatMeasure, formatPokemonName } from '../utils/format';
import type { Pokemon } from '../utils/types';
import '../styles/pokemon-card.css';

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const name = formatPokemonName(pokemon.name);

  return (
    <article className="pokemon-card">
      <p className="pokemon-card__number">{formatDexNumber(pokemon.id)}</p>
      <img
        className="pokemon-card__image"
        src={pokemon.image ?? placeholder}
        alt={name}
        width="200"
        height="200"
        loading="lazy"
      />
      <h2 className="pokemon-card__name">{name}</h2>
      <ul className="pokemon-card__types">
        {pokemon.types.map((type) => (
          <li key={type} className={`pokemon-card__type pokemon-card__type_kind_${type}`}>
            {TYPE_LABELS[type] ?? type}
          </li>
        ))}
      </ul>
      <dl className="pokemon-card__measures">
        <div>
          <dt>Altura</dt>
          <dd>{formatMeasure(pokemon.heightInMeters, 'm')}</dd>
        </div>
        <div>
          <dt>Peso</dt>
          <dd>{formatMeasure(pokemon.weightInKilograms, 'kg')}</dd>
        </div>
      </dl>
    </article>
  );
}

export default PokemonCard;
