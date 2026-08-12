import type { Character } from '../types/character';
import { API_BASE, parseApiError } from './utils';

export const characterService = {
  // GET /api/characters
  getAll: async (): Promise<Character[]> => {
    const res = await fetch(`${API_BASE}/api/character/getAll`, {
      credentials: 'include',
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to fetch characters');
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // GET /api/characters/getAllByTeam/{team_id}
  getAllByTeam: async (team_id: number): Promise<Character[]> => {
    const res = await fetch(`${API_BASE}/api/character/getAllByTeam/${team_id}`, {
      credentials: 'include',
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to fetch characters');
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // GET /api/character/getById/:id
  getById: async (id: string): Promise<Character> => {
    const res = await fetch(`${API_BASE}/api/character/getById/${id}`, {
      credentials: 'include',
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, `Failed to fetch character ${id}`);
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // POST /api/character/add
  create: async (character: Omit<Character, 'id'>): Promise<Character> => {
    const res = await fetch(`${API_BASE}/api/character/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
      credentials: 'include',
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to create character');
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // PUT /api/character/update/:id
  update: async (id: number, character: Partial<Character>): Promise<Character> => {
    const res = await fetch(`${API_BASE}/api/character/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
      credentials: 'include',
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, `Failed to update character ${id}`);
      throw new Error(errorMsg);
    }
    return res.json();
  },

  // DELETE /api/character/delete/:id
  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/character/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, `Failed to delete character ${id}`);
      throw new Error(errorMsg);
    }
  },
};
