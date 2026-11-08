import type { Game, GuessHistory } from "../../index.js";
export function testGame(secret: string, history: GuessHistory[] = []): Game {
  return {
    isNewGame: true,
    status: "playing",
    secret,
    history,
    config: {
      length: 4,
      base: 10,
    },
    totalTime: 0,
    setConfig: (g) => g,
  } as Game;
}
