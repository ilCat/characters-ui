import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Character } from '../../types/character';
import styles from './CharacterFormModal.module.css';

interface CharacterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: Partial<Character>) => void;
  editingCharacter?: Character | null;
}

export const CharacterFormModal: React.FC<CharacterFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingCharacter,
}) => {
  const [formData, setFormData] = useState<Partial<Character>>({
    name: '',
    level: 1,
    avatar: '',
    stats: { wins: 0, loses: 0, draws: 0 },
  });

  useEffect(() => {
    if (editingCharacter) {
      setFormData(editingCharacter);
    } else {
      setFormData({
        name: '',
        level: 50,
        stats: { wins: 0, loses: 0, draws: 0 },
      });
    }
  }, [editingCharacter, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newChar: Partial<Character> = {
      name: formData.name,
      level: Number(formData.level) || 1,
      avatar: formData.avatar || null,
      stats: {
        wins: editingCharacter?.stats?.wins ?? 0,
        loses: editingCharacter?.stats?.loses ?? 0,
        draws: editingCharacter?.stats?.draws ?? 0,
      },
      isFavorite: editingCharacter?.isFavorite || false,
      height: formData.height,
      weight: formData.weight,
      birthYear: formData.birthYear,
      teamId: formData.teamId,
    };

    onSave(newChar);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={onClose} type="button">
          <X size={20} />
        </button>

        <div style={{ padding: '24px 28px 16px', borderBottom: '1px solid var(--bg-glass-border)' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>
            {editingCharacter ? `Edit ${formData.name} Details` : 'Create New Character'}
          </h2>
          <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>
            Configure stats, class attributes, and hero profile details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <div className={styles.formGrid}>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Level (1 - 100)</label>
              <input
                type="number"
                min="1"
                max="100"
                className={styles.formInput}
                value={formData.level || 1}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Avatar Image URL</label>
              <input
                type="url"
                className={styles.formInput}
                placeholder="https://..."
                value={formData.avatar || ''}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Wins *</label>
              <input
                type="number"
                required
                className={styles.formInput}
                placeholder="0"
                value={formData.stats?.wins || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Loses *</label>
              <input
                type="number"
                required
                className={styles.formInput}
                placeholder="0"
                value={formData.stats?.loses || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Draws *</label>
              <input
                type="number"
                required
                className={styles.formInput}
                placeholder="0"
                value={formData.stats?.draws || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary}>
              <Save size={16} />
              {editingCharacter ? 'Save Changes' : 'Create Character'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
