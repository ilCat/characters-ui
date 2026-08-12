import React from 'react';
import { Star } from 'lucide-react';
import type { Character } from '../../types/character';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: Character;
  onSelect?: (character: Character) => void;
  onToggleFavorite?: (id: string, e: React.MouseEvent) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSelect,
  onToggleFavorite,
}) => {
  return (
    <div
      className={styles.charCard}
      onClick={() => onSelect && onSelect(character)}
    >
      <div className={styles.cardImageWrapper}>
        <img src={character.avatar || '/default-character.svg'} alt={character.name} className={styles.cardImg} />
        <div className={styles.cardOverlay} />

        <button
          className={`${styles.favBtn} ${character.isFavorite ? styles.favBtnActive : ''}`}
          onClick={(e) => onToggleFavorite && onToggleFavorite(character.id, e)}
          title={character.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          type="button"
        >
          <Star size={18} fill={character.isFavorite ? '#ef4444' : 'none'} />
        </button>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardHeaderInfo}>
          <span className={styles.charTitleSmall}>Lv. {character.level}</span>
          <h3 className={styles.charName}>{character.name}</h3>
        </div>
      </div>
    </div>
  );
};
