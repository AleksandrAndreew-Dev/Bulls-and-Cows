export { evaluateGuess } from "./core/evaluateGuess.js";
export { generateSecret } from "./core/generateSecret.js";
export { isValidGuess } from "./core/isValidGuess.js";
export { countPossibleSecrets } from "./core/countPossibleSecrets.js";
export { StartGame } from "./core/gameState.js";

export type {
  Game,
  GuessHistory,
  MoveResult,
  GameStatus,
  Base,
  Secret,
  GameConfig,
  Guess,
  isNewGame,
} from "../types/types.js";
