import { describe, test, expect } from "vitest";
import { generateSecret, generateNotRandom } from "./generateSecret.js";

// generateSecret(length, base, random = Math.random) — генерирует секретное число (секретное число рекомендуется представлять в виде строки или массива символов, чтобы корректно обрабатывать лидирующие нули, например, 0123 для длины 4): length уникальных цифр в системе счисления base. Функция обязательно принимает источник случайности параметром — это и есть приём, который делает генерацию тестируемой чистой функцией: в тестах вы передаёте детерминированный random, и результат становится предсказуемым.

describe("generateSecret", () => {
  test("generates a secret of the given length", () => {
    expect(generateSecret(4, 10)).toHaveLength(4);
  });
  test("generates a secret of unique values", () => {
    const generated = generateSecret(4, 10);

    expect(new Set([...generated]).size).toBe(4);
  });
  test("generates a secret with 0 as a first digit", () => {
    const generated = generateSecret(4, 10, generateNotRandom());
    expect(generated[0]).toBe("0");
  });
  test("length cannot be greater than base", () => {
    expect(() => generateSecret(3, 2)).toThrow(RangeError);
  });
  test("deterministic with custom random", () => {
    const random = generateNotRandom();
    const secret = generateSecret(4, 10, random);
    expect(secret).toBe("0123");
  });
});
