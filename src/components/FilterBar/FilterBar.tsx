import React from 'react';
import { PlusCircle, Search, SortAsc, Star, User } from 'lucide-react';
import type { SortOption } from '../../types/character';
import styles from './FilterBar.module.css';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../services/utils';

export interface OwnerOption {
  id: string;
  name: string;
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  onOpenCreateModal?: () => void;
  owners?: OwnerOption[];
  selectedOwner?: string;
  onOwnerChange?: (ownerId: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  showFavoritesOnly,
  onToggleFavorites,
  onOpenCreateModal,
  owners,
  selectedOwner,
  onOwnerChange,
}) => {
  const { user } = useAuth();
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterTopRow}>
        <button className="btn-primary" onClick={onOpenCreateModal} type="button">
          <PlusCircle size={16} />
        </button>
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
            className="btn-secondary"
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

          {user?.role === ROLES.MASTER && owners && owners.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <User size={16} style={{ color: 'var(--text-subtle)' }} />
              <select
                className={styles.customSelect}
                value={selectedOwner || 'all'}
                onChange={(e) => onOwnerChange && onOwnerChange(e.target.value)}
              >
                <option value="all">All Owners</option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </div>
          )}

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
              {user?.role === ROLES.MASTER && <><option value="owner-asc">Owner (A-Z)</option>
                <option value="owner-desc">Owner (Z-A)</option></>}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
