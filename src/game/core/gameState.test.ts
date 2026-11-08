import { describe, test, expect } from "vitest";
import { StartGame } from "../index.js";

describe("gameState", () => {
  test("Game ready before start", () => {
    expect(StartGame()).toHaveProperty("status");
    expect(StartGame().status).toBe("playing");
    expect(StartGame()).toHaveProperty("secret");
    expect(StartGame()).toHaveProperty("config");
    expect(StartGame()).toHaveProperty("totalTime");
    expect(StartGame().totalTime).toBe(0);
    expect(StartGame()).toHaveProperty("history");
    expect(StartGame().history).toEqual([]);
  });
});
