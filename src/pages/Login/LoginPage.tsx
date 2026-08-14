import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Shield, AlertCircle } from 'lucide-react';
import type { User } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';
import { Header } from '../../components/Header/Header';

import { useNotification } from '../../context/NotificationContext';

interface LoginPageProps {
  onLoginSuccess?: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (user: User) => {
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
    navigate('/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please fill in all fields.');
      showError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = await login({ email, password });
      handleSuccess(user);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred while signing in.';
      setError(msg);
      showError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.authPage}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <div className={styles.authIconBadge}>
              <Shield className="w-8 h-8 text-yellow-400" size={32} color="#FFEF00" />
            </div>
            <h1 className={styles.authTitle}>Sign In</h1>
            <p className={styles.authSubtitle}>Access your character and team management dashboard</p>
          </div>

          {error && (
            <div className={styles.authErrorAlert}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.authField}>
              <label className={styles.authLabel} htmlFor="email">
                Email Address
              </label>
              <div className={styles.authInputWrapper}>
                <Mail className={styles.authFieldIcon} size={18} />
                <input
                  id="email"
                  type="text"
                  className={styles.authInput}
                  placeholder="e.g. admin@example.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className={styles.authField}>
              <label className={styles.authLabel} htmlFor="password">
                Password
              </label>
              <div className={styles.authInputWrapper}>
                <Lock className={styles.authFieldIcon} size={18} />
                <input
                  id="password"
                  type="password"
                  className={styles.authInput}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.authSubmitBtn} disabled={isLoading}>
              {isLoading ? (
                <span className="auth-btn-spinner">Signing in...</span>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className={styles.authFooter}>
            <p>
              Don't have an account yet?{' '}
              <Link to="/register" className={styles.authLinkBtn}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
