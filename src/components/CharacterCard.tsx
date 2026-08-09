import React from 'react';
import { Star } from 'lucide-react';
import type { Character } from '../types/character';

interface CharacterCardProps {
  character: Character
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character
}) => {
  return (
    <div className="char-card" >
      <div className="card-image-wrapper">
        <img src={character.avatar} alt={character.name} className="card-img" />
        <div className="card-overlay" />

        <button
          className={`fav-btn ${character.isFavorite ? 'active' : ''}`}

          title={character.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          type="button"
        >
          <Star size={18} fill={character.isFavorite ? '#ef4444' : 'none'} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-header-info">
          <span className="char-title-small">Lv. {character.level}</span>
          <h3 className="char-name">{character.name}</h3>
        </div>
      </div>
    </div>
  );
};
