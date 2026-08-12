export interface User {
  id: number;
  name?: string;
  email: string;
  avatar?: string;
  role?: string;
  ownedTeamId?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
