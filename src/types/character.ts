

export interface Stats {
  wins?: number;
  loses?: number;
  draws?: number;
}

export interface Character {
  id: string;
  name: string;
  height?: number | string;
  weight?: number | string;
  birthYear?: Date | string;
  level: number;
  avatar: string;
  stats: Stats;
  isFavorite: boolean;
  createdAt: Date | string;
  teamId?: string;
}

export type SortOption = 'level-desc' | 'name-asc' | 'name-desc';
