export type GameStatus = 'preview' | 'playing' | 'finished';

export type Character = {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
};

export type GameCard = {
  id: string;
  characterId: number;
  name: string;
  image: string;
  species: string;
  status: string;
  isFlipped: boolean;
  isMatched: boolean;
};