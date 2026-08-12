import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, UserPlus, Shield, AlertCircle } from 'lucide-react';
import type { User } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import styles from './RegisterPage.module.css';

import { useNotification } from '../../context/NotificationContext';

interface RegisterPageProps {
  onRegisterSuccess?: (user: User) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showError, showSuccess } = useNotification();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password) {
      const msg = 'Please fill in all required fields.';
      setError(msg);
      showError(msg);
      return;
    }

    if (password.length < 6) {
      const msg = 'Password must be at least 6 characters long.';
      setError(msg);
      showError(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match. Please try again.';
      setError(msg);
      showError(msg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = await register({
        name: username,
        email,
        password,
      });
      if (onRegisterSuccess) {
        onRegisterSuccess(user);
      }
      showSuccess('Account created successfully!');
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred while creating your account.';
      setError(msg);
      showError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <div className={styles.authIconBadge}>
            <Shield className="w-8 h-8 text-yellow-400" size={32} color="#FFEF00" />
          </div>
          <h1 className={styles.authTitle}>Create Account</h1>
          <p className={styles.authSubtitle}>Sign up to start creating your characters</p>
        </div>

        {error && (
          <div className={styles.authErrorAlert}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.authField}>
            <label className={styles.authLabel} htmlFor="username">
              Username
            </label>
            <div className={styles.authInputWrapper}>
              <UserIcon className={styles.authFieldIcon} size={18} />
              <input
                id="username"
                type="text"
                className={styles.authInput}
                placeholder="e.g. Warrior123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className={styles.authField}>
            <label className={styles.authLabel} htmlFor="email">
              Email Address
            </label>
            <div className={styles.authInputWrapper}>
              <Mail className={styles.authFieldIcon} size={18} />
              <input
                id="email"
                type="email"
                className={styles.authInput}
                placeholder="e.g. user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className={styles.authField}>
            <label className={styles.authLabel} htmlFor="register-password">
              Password
            </label>
            <div className={styles.authInputWrapper}>
              <Lock className={styles.authFieldIcon} size={18} />
              <input
                id="register-password"
                type="password"
                className={styles.authInput}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className={styles.authField}>
            <label className={styles.authLabel} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className={styles.authInputWrapper}>
              <Lock className={styles.authFieldIcon} size={18} />
              <input
                id="confirmPassword"
                type="password"
                className={styles.authInput}
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.authSubmitBtn} disabled={isLoading}>
            {isLoading ? (
              <span className="auth-btn-spinner">Creating account...</span>
            ) : (
              <>
                <UserPlus size={20} />
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Already have an account?{' '}
            <Link to="/login" className={styles.authLinkBtn}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
