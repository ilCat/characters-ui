

export interface Stats {
  wins: number;
  loses: number;
  draws: number;
}

export interface Character {
  id?: number | null;
  name: string;
  height?: number | string;
  weight?: number | string;
  birthYear?: number | string;
  level: number;
  avatar?: string | null;
  stats: Stats;
  isFavorite: boolean;
  teamId?: number;
  ownerId?: number;
  ownerName?: string;
}

export type SortOption = 'level-desc' | 'name-asc' | 'name-desc' | 'owner-asc' | 'owner-desc';
