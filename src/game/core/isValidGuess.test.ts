import { describe, test, expect } from "vitest";
import { isValidGuess } from "./isValidGuess.js";

// isValidGuess(guess, length, base) — проверяет: длина совпадает,
// все символы — допустимые цифры для base, цифры не повторяются.

describe("isValidGuess", () => {
  test("return true for valid guess", () => {
    expect(isValidGuess("123", 3, 10)).toBe(true);
  });
  test("return false for guess.length < length", () => {
    expect(isValidGuess("23", 3, 10)).toBe(false);
  });
  test("return false for guess.length > length", () => {
    expect(isValidGuess("0123", 3, 10)).toBe(false);
  });
  test("base 10: guess contains non-digits", () => {
    expect(isValidGuess("01a", 3, 10)).toBe(false);
  });
  test("base 8: guess contains letter", () => {
    expect(isValidGuess("01a", 3, 8)).toBe(false);
  });
  test("base 8: guess contains non-octal digit", () => {
    expect(isValidGuess("018", 3, 8)).toBe(false);
  });
  test.each([
    ["011", 3, 10],
    ["0120", 4, 10],
    ["99", 2, 10],
    ["aa1", 3, 16],
  ])(`guess contains duplicate values: %s, %i, %i`, (guess, length, base) =>
    expect(isValidGuess(guess, length, base)).toBe(false),
  );
  test("base 16: same letters in different casing return false", () => {
    expect(isValidGuess("aA1", 3, 16)).toBe(false);
  });

  test("returns false for non-string guess", () => {
    // @ts-expect-error intentionally passing invalid type
    expect(isValidGuess(null, 4, 10)).toBe(false);
  });
  test("base 16: guess is valid", () => {
    expect(isValidGuess("ABC", 3, 16)).toBe(true);
    expect(isValidGuess("aB3", 3, 16)).toBe(true);
  });
  test("base 2: guess is valid", () => {
    expect(isValidGuess("10", 2, 2)).toBe(true);
  });
  test("base 2: guess is invalid", () => {
    expect(isValidGuess("12", 2, 2)).toBe(false);
  });
});
