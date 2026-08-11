import type { Character } from '../types/character';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const characterService = {
  // GET /api/characters
  getAll: async (): Promise<Character[]> => {
    const res = await fetch(`${API_BASE}/api/character/getAll`);
    if (!res.ok) {
      throw new Error(`Failed to fetch characters: ${res.statusText}`);
    }
    return res.json();
  },

  // GET /api/characters/getAllByTeam/{team_id}
  getAllByTeam: async (team_id: string): Promise<Character[]> => {
    const res = await fetch(`${API_BASE}/api/character/getAllByTeam/${team_id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch characters: ${res.statusText}`);
    }
    return res.json();
  },

  // GET /api/character/getById/:id
  getById: async (id: string): Promise<Character> => {
    const res = await fetch(`${API_BASE}/api/character/getById/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch character ${id}: ${res.statusText}`);
    }
    return res.json();
  },

  // POST /api/character/add
  create: async (character: Omit<Character, 'id' | 'createdAt'>): Promise<Character> => {
    const res = await fetch(`${API_BASE}/api/character/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
    if (!res.ok) {
      throw new Error(`Failed to create character: ${res.statusText}`);
    }
    return res.json();
  },

  // PUT /api/character/update/:id
  update: async (id: string, character: Partial<Character>): Promise<Character> => {
    const res = await fetch(`${API_BASE}/api/character/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
    if (!res.ok) {
      throw new Error(`Failed to update character ${id}: ${res.statusText}`);
    }
    return res.json();
  },

  // DELETE /api/character/delete/:id
  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/character/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to delete character ${id}: ${res.statusText}`);
    }
  },
};
