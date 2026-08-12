

export interface Stats {
  wins?: number;
  loses?: number;
  draws?: number;
  [key: string]: number | undefined;
}

export interface Character {
  id: string;
  name: string;
  height?: number | string;
  weight?: number | string;
  birthYear?: number | string;
  level?: number;
  avatar?: string;
  stats?: Stats;
  isFavorite: boolean;
  teamId?: number;
}

export type SortOption = 'level-desc' | 'name-asc' | 'name-desc';
