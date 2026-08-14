import type { User, LoginCredentials, RegisterCredentials } from '../types/auth';
import { API_BASE, parseApiError } from './utils';


export const authService = {
  getCurrentUser: async (): Promise<User | null> => {
    const data = await fetch(`${API_BASE}/api/auth/me`, {
      credentials: 'include',
    });
    if (!data.ok) return null;
    try {
      return await data.json();
    } catch {
      return null;
    }
  },

  login: async (credentials: LoginCredentials): Promise<User> => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to login');
      throw new Error(errorMsg);
    }
    const data = await fetch(`${API_BASE}/api/auth/me`, {
      credentials: 'include',
    });
    if (!data.ok) {
      const errorMsg = await parseApiError(data, 'Failed to fetch user profile');
      throw new Error(errorMsg);
    }
    try {
      return await data.json();
    } catch {
      const errorMsg = await parseApiError(data, 'Failed to parse user profile');
      throw new Error(errorMsg);
    }
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
    // Create User
    const res = await fetch(`${API_BASE}/api/user/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to register');
      throw new Error(errorMsg);
    }
    // Login User
    const user = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    if (!user.ok) {
      const errorMsg = await parseApiError(user, 'Failed to login after registration');
      throw new Error(errorMsg);
    }
    return user.json();
  },

  logout: async (): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
      const errorMsg = await parseApiError(res, 'Failed to logout');
      throw new Error(errorMsg);
    }
  },
};
