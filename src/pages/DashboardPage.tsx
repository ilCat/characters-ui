import React, { useState, useMemo, useEffect } from 'react';
import { FilterBar } from '../components/FilterBar';
import { CharacterGrid } from '../components/CharacterGrid';
import { INITIAL_CHARACTERS } from '../data/mockCharacters';
import type { Character, SortOption } from '../types/character';
import { characterService } from '../services/characterService';

interface DashboardPageProps {
  onOpenCreateModalSignal?: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = () => {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('characters-ui-data');
    return saved ? JSON.parse(saved) : INITIAL_CHARACTERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('level-desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    characterService
      .getAll()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCharacters(data);
        }
      })
      .catch((err) => {
        console.warn('Backend not reached or error fetching characters, using local storage/mock data:', err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('characters-ui-data', JSON.stringify(characters));
  }, [characters]);



  const filteredCharacters = useMemo(() => {
    return characters
      .filter((char) => {
        if (showFavoritesOnly && !char.isFavorite) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = char.name.toLowerCase().includes(q);
          if (!matchName) return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'level-desc':
            return b.level - a.level;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [characters, searchQuery, sortOption, showFavoritesOnly]);

  return (
    <>
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />

      <CharacterGrid
        characters={filteredCharacters}
      />


    </>
  );
};
