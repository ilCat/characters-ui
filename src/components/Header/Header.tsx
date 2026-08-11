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
          <Shield size={24} color="#FFEF00" />
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
              <Sparkles size={16} color="#FFEF00" />
              Total: <span>{characters.length}</span>
            </div>

            <div className={styles.statBadge}>
              <Star size={16} color="#FFEF00" />
              Favoritos: <span>{favoritesCount}</span>
            </div>
            {onOpenCreateModal && (
              <button className={styles.btnPrimary} onClick={onOpenCreateModal}>
                <PlusCircle size={18} />
                Nuevo Personaje
              </button>
            )}

            <div className={styles.userProfileBadge}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className={styles.userAvatar} />
              ) : (
                <div className={styles.userAvatarPlaceholder}>
                  <UserIcon size={16} />
                </div>
              )}
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.username}</span>
                <span className={styles.userRole}>{user.role || 'Usuario'}</span>
              </div>
              <button
                className={styles.btnLogout}
                onClick={handleLogoutClick}
                title="Cerrar Sesión"
                type="button"
              >
                <LogOut size={16} />
              </button>
            </div>
          </>
        )}

        {!user && (
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/login" className={styles.btnSecondary} style={{ textDecoration: 'none' }}>
              Iniciar Sesión
            </Link>
            <Link to="/register" className={styles.btnPrimary} style={{ textDecoration: 'none' }}>
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </header >
  );
};
