import type { User } from '../types/auth';
import { API_BASE, parseApiError } from './utils';
import { apiFetch } from './apiClient';

export const userService = {
  // GET /api/user/getAll
  getAll: async (): Promise<User[]> => {
    const res = await apiFetch(`${API_BASE}/api/user/getAll`);
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to fetch users');
      throw new Error(errorMsg);
    }
    return res.json();
  },
};
