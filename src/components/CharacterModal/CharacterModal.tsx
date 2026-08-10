import React from 'react';
import { X, Star, Edit, Trash2 } from 'lucide-react';
import type { Character } from '../../types/character';
import styles from './CharacterModal.module.css';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (character: Character) => void;
  onDelete: (id: string) => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
  onToggleFavorite,
  onEdit,
  onDelete,
}) => {
  if (!character) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={onClose} type="button">
          <X size={20} />
        </button>

        <div className={styles.modalHero}>
          <img
            src={character.avatar}
            alt={character.name}
            className={styles.modalHeroImg}
          />
        </div>

        <div className={styles.modalBody}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className={`${styles.btnSecondary} ${character.isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(character.id)}
                type="button"
              >
                <Star size={16} fill={character.isFavorite ? '#ef4444' : 'none'} color={character.isFavorite ? '#ef4444' : 'currentColor'} />
                {character.isFavorite ? 'Favorited' : 'Favorite'}
              </button>
              <button className={styles.btnSecondary} onClick={() => onEdit(character)} type="button">
                <Edit size={16} />
                Edit
              </button>
              <button
                className={styles.btnSecondary}
                style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                onClick={() => onDelete(character.id)}
                type="button"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Combat Stats</h4>
            <div className={styles.statBarsGrid}>
              {Object.entries(character.stats).map(([key, value]) => (
                <div key={key}><strong>{key}:</strong><p>{value}</p> </div>
              ))
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
