import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Star, Sparkles } from 'lucide-react';
import type { Character } from '../../types/character';
import styles from './Header.module.css';

interface HeaderProps {
  characters?: Character[];
}

export const Header: React.FC<HeaderProps> = ({ characters = [] }) => {
  const favoritesCount = characters.filter((c) => c.isFavorite).length;

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <div className={styles.brandIcon}>
          <Shield size={24} color="#FFEF00" />
        </div>
        <div>
          <h1 className={styles.brandTitle}>Characters</h1>
          <p className={styles.brandSubtitle}>Dashboard & Explorer</p>
        </div>
      </Link>

      <div className={styles.headerActions}>
        <div className={styles.statBadge}>
          <Sparkles size={16} color="#FFEF00" />
          Total: <span>{characters.length}</span>
        </div>

        <div className={styles.statBadge}>
          <Star size={16} color="#FFEF00" />
          Favoritos: <span>{favoritesCount}</span>
        </div>
      </div>
    </header>
  );
};
