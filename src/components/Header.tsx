import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Star, Sparkles } from 'lucide-react';
import type { Character } from '../types/character';

interface HeaderProps {
  characters?: Character[]
}

export const Header: React.FC<HeaderProps> = ({
  characters = []
}) => {
  const favoritesCount = characters.filter((c) => c.isFavorite).length;



  return (
    <header className="header">
      <Link to="/" className="brand" style={{ textDecoration: 'none' }}>
        <div className="brand-icon">
          <Shield size={24} color="#FFEF00" />
        </div>
        <div>
          <h1 className="brand-title">Characters</h1>
          <p className="brand-subtitle">Dashboard & Explorer</p>
        </div>
      </Link>

      <div className="header-actions">
        <div className="stat-badge">
          <Sparkles size={16} color="#FFEF00" />
          Total: <span>{characters.length}</span>
        </div>

        <div className="stat-badge">
          <Star size={16} color="#FFEF00" />
          Favoritos: <span>{favoritesCount}</span>
        </div>
      </div>
    </header>
  );
};
