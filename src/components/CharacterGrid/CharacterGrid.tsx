import React from 'react';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import type { Character } from '../../types/character';
import { SearchX, PlusCircle } from 'lucide-react';
import styles from './CharacterGrid.module.css';

interface CharacterGridProps {
  characters: Character[];
  onSelectCharacter?: (character: Character) => void;
  onToggleFavorite?: (id: string, e: React.MouseEvent) => void;
  onResetFilters?: () => void;
  onOpenCreateModal?: () => void;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  onSelectCharacter,
  onToggleFavorite,
  onResetFilters,
  onOpenCreateModal,
}) => {
  if (characters.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <SearchX size={32} />
        </div>
        <h2>No Characters Found</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 420 }}>
          No heroes match your active filter parameters or search query. Try adjusting your filters or add a new hero!
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          {onResetFilters && (
            <button className={styles.btnSecondary} onClick={onResetFilters} type="button">
              Reset Filters
            </button>
          )}
          {onOpenCreateModal && (
            <button className={styles.btnPrimary} onClick={onOpenCreateModal} type="button">
              <PlusCircle size={16} />
              Create Character
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.characterGrid}>
      {characters.map((char) => (
        <CharacterCard
          key={char.id}
          character={char}
          onSelect={onSelectCharacter}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
