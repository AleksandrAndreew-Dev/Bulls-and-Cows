import { describe, test, expect } from "vitest";
import { makeGuess } from "./makeGuess.js";

import { testGame } from "./utils/testGame.js";

describe("makeGuess", () => {
  test("adds one history entry for valid guess", () => {
    const newGame = testGame("1234");
    const result = makeGuess(newGame, "1234");

    expect(result.history.length).toBe(1);
    expect(result.history[0]?.guess).toBe("1234");
    expect(result.history[0]?.count).toBe(1);
  });
  test("does not mutate original game", () => {
    const newGame = testGame("1234");
    makeGuess(newGame, "1234");
    expect(newGame.history.length).toBe(0);
  });
  test("sets status to end if game is over", () => {
    const newGame = testGame("1234");
    const result = makeGuess(newGame, "1234");
    expect(result.status).toBe("end");
  });
  test("does not add history for invalid gues", () => {
    const newGame = testGame("1234");
    makeGuess(newGame, "12");
    expect(newGame.history.length).toBe(0);
  });
});
