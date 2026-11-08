import { describe, expect, test } from "vitest";
import { createDigitValidator } from "./createDigitValidator.js";

// createDigitValidator(base) → (char) => boolean — каррированная фабрика: по системе счисления возвращает функцию-предикат «этот символ — допустимая цифра в этой системе». Используется и в isValidGuess, и при вводе в реальном времени (блокировка недопустимых символов). Для hex регистр не важен (a и A — одна и та же цифра): приводите символ к нижнему регистру (toLowerCase) перед сравнением везде, где сравниваются цифры — в валидаторе, в evaluateGuess, при сверке с секретом.

describe("createDigitValidator", () => {
  test("call with one argument will return function", () => {
    expect(typeof createDigitValidator(2)).toBe("function");
  });
  test("call with two arguments will return boolean", () => {
    expect(typeof createDigitValidator(2)("0")).toBe("boolean");
  });

  test("rejects multi-digit characters", () => {
    const valid = createDigitValidator(2);
    expect(valid("00")).toBe(false);
    expect(valid("01")).toBe(false);
    expect(valid("10")).toBe(false);
  });

  test("returns false for empty char string", () => {
    const valid = createDigitValidator(2);
    expect(valid("")).toBe(false);
  });
  test('call with hex base will return true for "a" and "A"', () => {
    const valid = createDigitValidator(16);
    expect(valid("a")).toBe(true);
    expect(valid("A")).toBe(true);
  });

  test("base 2 rejects 2 and letteres", () => {
    const valid = createDigitValidator(2);
    expect(valid("2")).toBe(false);
    expect(valid("a")).toBe(false);
  });
  test("base 2 accepts 0 and 1", () => {
    const valid = createDigitValidator(2);
    expect(valid("0")).toBe(true);
    expect(valid("1")).toBe(true);
  });
  test("base 8 rejects 8 and letteres", () => {
    const valid = createDigitValidator(8);
    expect(valid("8")).toBe(false);
    expect(valid("a")).toBe(false);
  });
  test("base 8 accepts 7", () => {
    const valid = createDigitValidator(8);
    expect(valid("7")).toBe(true);
  });
  test("base 10 rejects letters any case", () => {
    const valid = createDigitValidator(10);
    expect(valid("A")).toBe(false);
    expect(valid("a")).toBe(false);
  });
  test("base 10 accepts digits 0-9", () => {
    const valid = createDigitValidator(10);
    expect(valid("0")).toBe(true);
    expect(valid("9")).toBe(true);
  });
});
