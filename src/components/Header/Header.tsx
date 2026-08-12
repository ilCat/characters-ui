import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, PlusCircle, Star, Sparkles, LogOut, User as UserIcon } from 'lucide-react';
import type { Character } from '../../types/character';
import type { User } from '../../types/auth';
import styles from './Header.module.css';

interface HeaderProps {
  characters?: Character[];
  user?: User | null;
  onOpenCreateModal?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  characters = [],
  user = null,
  onOpenCreateModal,
  onLogout,
}) => {
  const navigate = useNavigate();
  const favoritesCount = characters.filter((c) => c.isFavorite).length;

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };


  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <div className={styles.brandIcon}>
          <Shield size={24} />
        </div>
        <div>
          <h1 className={styles.brandTitle}>Characters</h1>
          <p className={styles.brandSubtitle}>Dashboard & Explorer</p>
        </div>
      </Link>

      <div className={styles.headerActions}>
        {user && (
          <>
            <div className={styles.statBadge}>
              <Sparkles size={16} color="var(--accent-yellow)" />
              Total: <span>{characters.length}</span>
            </div>

            <div className={styles.statBadge}>
              <Star size={16} color="var(--accent-yellow)" />
              Favorites: <span>{favoritesCount}</span>
            </div>
            {onOpenCreateModal && (
              <button className="btn-primary" onClick={onOpenCreateModal}>
                <PlusCircle size={18} />
                New Character
              </button>
            )}

            <div className={styles.userProfileBadge}>
              <img src={user.avatar || '/default-user.svg'} alt={user.name || 'User'} className={styles.userAvatar} />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name || user.email}</span>
                <span className={styles.userRole}>{user.role || 'User'}</span>
              </div>
              <button
                className={styles.btnLogout}
                onClick={handleLogoutClick}
                title="Sign Out"
                type="button"
              >
                <LogOut size={16} />
              </button>
            </div>
          </>
        )}

        {!user && (
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header >
  );
};
