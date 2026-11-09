import { DEFAULT_CONFIG } from "../../types/types.js";
import type { Game, Base } from "../../types/types.js";
import { generateSecret } from "./generateSecret.js";

function setConfig(game: Game, length: number, base: Base): Game {
  return { ...game, config: { length, base } };
}

export function StartGame(config = DEFAULT_CONFIG): Game {
  const game: Game = {
    isNewGame: true,
    status: "playing",
    secret: generateSecret(config.length, config.base),
    history: [],
    config: config,
    totalTime: 0,

    setConfig,
  };
  return game;
}
