import React from 'react';
import { CharacterCard } from './CharacterCard';
import type { Character } from '../types/character';
import { SearchX, PlusCircle } from 'lucide-react';

interface CharacterGridProps {
  characters: Character[];
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters
}) => {
  if (characters.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <SearchX size={32} />
        </div>
        <h2>No Characters Found</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 420 }}>
          No heroes match your active filter parameters or search query. Try adjusting your filters or add a new hero!
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button className="btn-secondary">
            Reset Filters
          </button>
          <button className="btn-primary">
            <PlusCircle size={16} />
            Create Character
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="character-grid">
      {characters.map((char) => (
        <CharacterCard
          key={char.id}
          character={char}
        />
      ))}
    </div>
  );
};
