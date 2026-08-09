import React from 'react';
import { Search, SortAsc, Star } from 'lucide-react';
import type { SortOption } from '../../types/character';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  showFavoritesOnly,
  onToggleFavorites,
}) => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterTopRow}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search characters by name, title, or role..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className={styles.selectGroup}>
          <button
            className={styles.btnSecondary}
            onClick={onToggleFavorites}
            style={{
              borderColor: showFavoritesOnly ? '#ef4444' : undefined,
              color: showFavoritesOnly ? '#ef4444' : undefined,
            }}
            type="button"
          >
            <Star size={16} fill={showFavoritesOnly ? '#ef4444' : 'none'} />
            Favorites Only
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <SortAsc size={16} style={{ color: 'var(--text-subtle)' }} />
            <select
              className={styles.customSelect}
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
            >
              <option value="level-desc">Highest Level</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
