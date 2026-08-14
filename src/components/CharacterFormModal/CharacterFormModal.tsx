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

const emptyCharacter: Omit<Character, 'id'> = {
  name: '',
  level: 1,
  avatar: '',
  stats: { wins: 0, loses: 0, draws: 0 },
  height: 170,
  weight: 70,
  birthYear: 1995,
  isFavorite: false,
};

export const CharacterFormModal: React.FC<CharacterFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingCharacter,
}) => {
  const [formData, setFormData] = useState<Character>(emptyCharacter);

  useEffect(() => {
    if (editingCharacter) {
      setFormData(editingCharacter);
    } else {
      setFormData(emptyCharacter);
    }
  }, [editingCharacter, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newChar: Partial<Character> = {
      ...(formData.id ? { id: formData.id } : {}),
      name: formData.name,
      level: Number(formData.level) || 1,
      height: Number(formData.height) || 170,
      weight: Number(formData.weight) || 70,
      birthYear: Number(formData.birthYear) || 1995,
      avatar: formData.avatar || null,
      stats: {
        wins: Number(formData.stats?.wins) || 0,
        loses: Number(formData.stats?.loses) || 0,
        draws: Number(formData.stats?.draws) || 0,
      },
      isFavorite: formData.isFavorite || false,
      ...(formData.teamId ? { teamId: formData.teamId } : {}),
    };

    onSave(newChar);
    onClose();
  };

  const characterEditForm = [{ label: "Name", type: "text", value: formData.name, onChange: (e: any) => setFormData({ ...formData, name: e.target.value }) },
  { label: "Height (cm)", type: "number", min: 150, max: 250, value: formData.height, onChange: (e: any) => setFormData({ ...formData, height: parseInt(e.target.value) || 150 }) },
  { label: "Weight (kg)", type: "number", min: 30, max: 200, value: formData.weight, onChange: (e: any) => setFormData({ ...formData, weight: parseInt(e.target.value) || 30 }) },
  { label: "Birth Year", type: "number", min: 1900, max: 2009, value: formData.birthYear, onChange: (e: any) => setFormData({ ...formData, birthYear: e.target.value || 1994 }) },
  { label: "Level", type: "number", min: 1, max: 100, value: formData.level, onChange: (e: any) => setFormData({ ...formData, level: parseInt(e.target.value) || 1 }) },
  { label: "Avatar", type: "url", value: formData.avatar, onChange: (e: any) => setFormData({ ...formData, avatar: e.target.value }) },
  { label: "Wins", type: "number", min: 0, max: 1000, value: formData.stats.wins, onChange: (e: any) => setFormData({ ...formData, stats: { wins: parseInt(e.target.value) || 0, loses: formData.stats.loses, draws: formData.stats.draws } }) },
  { label: "Loses", type: "number", min: 0, max: 1000, value: formData.stats.loses, onChange: (e: any) => setFormData({ ...formData, stats: { wins: formData.stats.wins, loses: parseInt(e.target.value) || 0, draws: formData.stats.draws } }) },
  { label: "Draws", type: "number", min: 0, max: 1000, value: formData.stats.draws, onChange: (e: any) => setFormData({ ...formData, stats: { wins: formData.stats.wins, loses: formData.stats.loses, draws: parseInt(e.target.value) || 0 } }) }
  ]
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
            {characterEditForm.map((item, index) => (
              <div key={index} className={styles.formGroup}>
                <label className={styles.formLabel}>{item.label}</label>
                <input
                  className={styles.formInput}
                  disabled={editingCharacter !== null && (item.label === "Name" || item.label === "Height (cm)" || item.label === "Weight (kg)" || item.label === "Birth Year")}
                  type={item.type}
                  min={item?.min}
                  max={item?.max}
                  value={item.value ? item.value : undefined}
                  onChange={item.onChange}
                />
              </div>
            ))}


          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} />
              {editingCharacter ? 'Save Changes' : 'Create Character'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
