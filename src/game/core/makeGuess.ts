import type { Game, Guess, GuessHistory } from "../index.js";
import { isValidGuess, evaluateGuess } from "../index.js";

export function makeGuess(game: Game, guess: Guess): Game {
  if (!isValidGuess(guess, game.config.length, game.config.base)) return game;
  const result = evaluateGuess(game.secret, guess);
  const entry: GuessHistory = {
    timestamp: new Date().toISOString(),
    count: game.history.length + 1,
    guess,
    result,
  };
  return {
    ...game,
    isNewGame: false,
    status: result.bulls === game.config.length ? "end" : "playing",
    history: [...game.history, entry],
  };
}
