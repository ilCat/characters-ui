import type { User, LoginCredentials, RegisterCredentials } from '../types/auth';

// const STORAGE_KEY_USER = 'user_id';
// const STORAGE_KEY_TEAM = 'team_id';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const authService = {
  getCurrentUser: async (): Promise<User> => {
    // const data = localStorage.getItem(STORAGE_KEY_USER);
    const data = await fetch(`${API_BASE}/api/auth/me`);
    if (!data.ok) return null;
    try {
      return data.json();
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
    });
    if (!res.ok) {
      throw new Error(`Failed to login: ${res.statusText}`);
    }
    // const { password: _password, ...cleanUser } = user;
    // localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(cleanUser));
    // return cleanUser;
    return res.json();
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
    // Create User
    const res = await fetch(`${API_BASE}/api/user/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      throw new Error(`Failed to register: ${res.statusText}`);
    }
    // Login User
    const user = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!user.ok) {
      throw new Error(`Failed to login: ${user.statusText}`);
    }
    return user.json();
  },

  logout: async (): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to logout: ${res.statusText}`);
    }
  },
};
