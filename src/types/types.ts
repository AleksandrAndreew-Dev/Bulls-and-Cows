export const DEFAULT_CONFIG: GameConfig = {
  length: 4,
  base: 10,
};

export type Secret = string;
export type Guess = string;
export type isNewGame = true | false;
export type Base = 2 | 8 | 10 | 16;

export type MoveResult = {
  bulls: number;
  cows: number;
};

export type GameStatus = "playing" | "end";

export type GameConfig = {
  length: number;
  base: Base;
};
export interface Game {
  isNewGame: isNewGame;
  status: GameStatus;
  secret: Secret;
  history: GuessHistory[];
  config: GameConfig;
  totalTime: number;
  setConfig(game: Game, length: number, base: number): Game;
}

export interface GuessHistory {
  timestamp: string;
  count: number;
  guess: Guess;
  result: MoveResult;
}

export interface GameRecord {
  length: number;
  base: Base;
  attempts: number;
  time: number;
  date: string;
}
