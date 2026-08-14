import type { Character } from '../types/character';
import { API_BASE, parseApiError } from './utils';
import { apiFetch } from './apiClient';

export const characterService = {
  // GET /api/characters
  getAll: async (): Promise<Character[]> => {
    const res = await apiFetch(`${API_BASE}/api/character/getAll`);
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to fetch characters');
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // GET /api/characters/getAllByTeam/{team_id}
  getAllByTeam: async (team_id: number): Promise<Character[]> => {
    const res = await apiFetch(`${API_BASE}/api/character/getAllByTeam/${team_id}`);
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to fetch characters');
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // GET /api/character/getById/:id
  getById: async (id: string): Promise<Character> => {
    const res = await apiFetch(`${API_BASE}/api/character/getById/${id}`);
    if (!res.ok) {
      const errorMsg = await parseApiError(res, `Failed to fetch character ${id}`);
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // POST /api/character/add
  create: async (character: Omit<Character, 'id'>): Promise<Character> => {
    const res = await apiFetch(`${API_BASE}/api/character/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to create character');
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // PUT /api/character/update/:id
  update: async (id: number, character: Partial<Character>): Promise<Character> => {
    const res = await apiFetch(`${API_BASE}/api/character/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, `Failed to update character ${id}`);
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // DELETE /api/character/delete/:id
  delete: async (id: number): Promise<void> => {
    const res = await apiFetch(`${API_BASE}/api/character/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, `Failed to delete character ${id}`);
      throw new Error(errorMsg);
    }
  },
};
