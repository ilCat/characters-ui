import React, { useState, useMemo, useEffect } from 'react';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { CharacterGrid } from '../../components/CharacterGrid/CharacterGrid';
import type { Character, SortOption } from '../../types/character';
import { characterService } from '../../services/characterService';
import { CharacterModal } from '../../components/CharacterModal/CharacterModal';
import { CharacterFormModal } from '../../components/CharacterFormModal/CharacterFormModal';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/Header/Header';
import { useNotification } from '../../context/NotificationContext';
import { ROLES } from '../../services/utils';

export const DashboardPage: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { showError, showSuccess } = useNotification();
  const [characters, setCharacters] = useState<Character[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('level-desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      const teamId = user?.ownedTeamId;
      const role = user?.role;
      try {
        const data = role === ROLES.MASTER
          ? await characterService.getAll()
          : teamId ? await characterService.getAllByTeam(teamId) : [];
        if (Array.isArray(data)) {
          setCharacters(data);
        }
      } catch (err) {
        showError(err instanceof Error ? err.message : 'Failed to fetch characters');
      }
    };

    fetchCharacters();
  }, [user?.ownedTeamId, showError]);

  const handleToggleFavorite = async (id: number, e?: React.MouseEvent) => {
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
      showError(err instanceof Error ? err.message : 'Failed to update favorite status');
    }
  };

  const handleSaveCharacter = async (char: Partial<Character>) => {
    const teamId = user?.ownedTeamId;
    if (editingCharacter && editingCharacter.id) {
      try {
        const updatedCharacter = await characterService.update(editingCharacter.id, char);
        setCharacters((prev) =>
          prev.map((c) => (c.id === editingCharacter.id ? { ...c, ...updatedCharacter } : c))
        );
        setSelectedCharacter((prev) =>
          prev && prev.id === editingCharacter.id ? { ...prev, ...updatedCharacter } : prev
        );
        showSuccess('Character updated successfully!');
      } catch (err) {
        showError(err instanceof Error ? err.message : 'Failed to update character');
      }
    } else {
      try {
        const payload = {
          ...char,
          teamId: teamId || char.teamId,
        };
        const newCharacter = await characterService.create(payload as any);
        setCharacters((prev) => [newCharacter, ...prev]);
        setSelectedCharacter(newCharacter);
        showSuccess('Character created successfully!');
      } catch (err) {
        showError(err instanceof Error ? err.message : 'Failed to create character');
      }
    }
    setEditingCharacter(null);
  };

  const handleDeleteCharacter = async (id: number) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    setSelectedCharacter(null);
    try {
      await characterService.delete(id);
      showSuccess('Character deleted successfully!');
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to delete character');
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
      <Header
        characters={characters}
        user={user}
        onLogout={logout}
      />
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        onOpenCreateModal={() => {
          setEditingCharacter(null);
          setIsFormOpen(true);
        }}
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
