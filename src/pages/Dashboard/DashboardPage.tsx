import React, { useState, useMemo, useEffect } from 'react';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { CharacterGrid } from '../../components/CharacterGrid/CharacterGrid';
import type { Character, SortOption } from '../../types/character';
import { characterService } from '../../services/characterService';
import { CharacterModal } from '../../components/CharacterModal/CharacterModal';
import { CharacterFormModal } from '../../components/CharacterFormModal/CharacterFormModal';

interface DashboardPageProps {
  onOpenCreateModalSignal?: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('level-desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

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

  const handleToggleFavorite = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const char = characters.find((c) => c.id === id);
    const updatedFav = char ? !char.isFavorite : true;

    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: updatedFav } : c))
    );
    if (selectedCharacter && selectedCharacter.id === id) {
      setSelectedCharacter((prev) => (prev ? { ...prev, isFavorite: updatedFav } : null));
    }

    try {
      await characterService.update(id, { isFavorite: updatedFav });
    } catch (err) {
      console.warn('Could not sync favorite toggle to backend:', err);
    }
  };

  const handleSaveCharacter = async (char: Character) => {
    if (editingCharacter) {
      setCharacters((prev) => prev.map((c) => (c.id === char.id ? char : c)));
      setSelectedCharacter(char);
      try {
        await characterService.update(char.id, char);
      } catch (err) {
        console.warn('Could not sync update to backend:', err);
      }
    } else {
      setCharacters((prev) => [char, ...prev]);
      try {
        await characterService.create(char);
      } catch (err) {
        console.warn('Could not sync new character to backend:', err);
      }
    }
    setEditingCharacter(null);
  };

  const handleDeleteCharacter = async (id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    setSelectedCharacter(null);
    try {
      await characterService.delete(id);
    } catch (err) {
      console.warn('Could not sync delete to backend:', err);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSortOption('level-desc');
    setShowFavoritesOnly(false);
  };

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
        onSelectCharacter={setSelectedCharacter}
        onToggleFavorite={handleToggleFavorite}
        onResetFilters={handleResetFilters}
        onOpenCreateModal={() => {
          setEditingCharacter(null);
          setIsFormOpen(true);
        }}
      />

      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        onToggleFavorite={(id) => handleToggleFavorite(id)}
        onEdit={(char) => {
          setEditingCharacter(char);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteCharacter}
      />

      <CharacterFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCharacter(null);
        }}
        onSave={handleSaveCharacter}
        editingCharacter={editingCharacter}
      />
    </>
  );
};
