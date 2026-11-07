import { describe, test, expect } from "vitest";
import { evaluateGuess } from "./evaluateGuess.js";
// evaluateGuess(secret, guess) → { bulls, cows } — сравнивает попытку с секретным числом. Реализуйте через методы массивов (map/filter/reduce), а не через ручные циклы со счётчиками — это и есть использование функций высшего порядка по существу задачи, а не для рендера.

describe("evaluateGuess", () => {
  test("full match: should return {bulls: 4, cows: 0}", () => {
    expect(evaluateGuess("1234", "1234")).toEqual({ bulls: 4, cows: 0 });
  });

  test("all cows: return {bulls: 0, cows: 4} for not correct guess", () => {
    expect(evaluateGuess("1234", "4321")).toEqual({ bulls: 0, cows: 4 });
  });
  test("mixed bulls and cows: return {bulls: 2, cows: 2}", () => {
    expect(evaluateGuess("1234", "1243")).toEqual({ bulls: 2, cows: 2 });
  });

  test("no matches: should return {bulls: 0, cows: 0} for incorrect guess", () => {
    expect(evaluateGuess("1234", "5678")).toEqual({ bulls: 0, cows: 0 });
  });

  test("single bull: should return {bulls: 1, cows: 0} for incorrect guess", () => {
    expect(evaluateGuess("1234", "1567")).toEqual({ bulls: 1, cows: 0 });
  });

  test("should return {bulls: 0, cows: 0} for empty guess", () => {
    expect(evaluateGuess("1234", "")).toEqual({ bulls: 0, cows: 0 });
  });
  test("hex: case-insensitive full match", () => {
    expect(evaluateGuess("aB3", "AB3")).toEqual({ bulls: 3, cows: 0 });
  });
  test("hex: case-insensitive cows count", () => {
    expect(evaluateGuess("1a3", "A13")).toEqual({ bulls: 1, cows: 2 });
  });
});
