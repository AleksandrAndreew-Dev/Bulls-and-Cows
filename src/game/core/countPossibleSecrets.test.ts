import { describe, expect, test } from "vitest";
import { countPossibleSecrets } from "./countPossibleSecrets.js";

// countPossibleSecrets(length, base) — считает, сколько существует различных секретных чисел при данных length и base (количество перестановок без повторений). Секрет может начинаться с 0 — ограничений на первую цифру нет (см. пример 0123 выше), поэтому это просто P(base, length) = base! / (base − length)!, без отдельного вычитания варианта с нулём в начале. Реализуйте рекурсивно (через связь countPossibleSecrets(length, base) = base * countPossibleSecrets(length - 1, base - 1)-подобную формулу), а затем мемоизируйте результат — функция вызывается при каждом открытии настроек, пересчитывать заново незачем.

describe("countPossibleSecrets", () => {
  test("for length = 0: return 1", () => {
    const result = countPossibleSecrets(0, 4);
    expect(result).toBe(1);
  });
  test("for length = 3 ; base = 4 ; return 24", () => {
    const result = countPossibleSecrets(3, 4);
    expect(result).toBe(24);
  });
  test("length cannot be greater than base. for length = 2 ; base = 1", () => {
    expect(() => countPossibleSecrets(2, 1)).toThrow(RangeError);
  });

  test("returns the same result on repeated call with same args", () => {
    const first = countPossibleSecrets(3, 4);
    const second = countPossibleSecrets(3, 4);
    expect(first).toBe(24);
    expect(second).toBe(24);
    expect(first).toBe(second);
  });
});
