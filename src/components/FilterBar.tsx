import React from 'react';
import { Search, SortAsc, Star } from 'lucide-react';
import type { SortOption } from '../types/character';

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
    <div className="filter-bar">
      <div className="filter-top-row">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search characters by name, title, or role..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="select-group">
          <button
            className={`btn-secondary ${showFavoritesOnly ? 'active' : ''}`}
            onClick={onToggleFavorites}
            style={{
              borderColor: showFavoritesOnly ? '#ef4444' : undefined,
              color: showFavoritesOnly ? '#ef4444' : undefined,
            }}
          >
            <Star size={16} fill={showFavoritesOnly ? '#ef4444' : 'none'} />
            Favorites Only
          </button>


          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <SortAsc size={16} className="text-subtle" />
            <select
              className="custom-select"
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
