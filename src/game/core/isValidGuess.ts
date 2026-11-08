import { createDigitValidator } from "./createDigitValidator.js";

export function isValidGuess(
  guess: string,
  length: number,
  base: number,
): boolean {
  if (guess == undefined) {
    return false;
  }
  if (guess.length === 0) return false;
  if (typeof guess !== "string" || guess.length !== length) {
    return false;
  }

  for (const char of guess) {
    if (!createDigitValidator(base)(char)) return false;
  }

  const seen = new Set();
  for (const char of guess) {
    const charLower = char.toLowerCase();
    if (seen.has(charLower)) {
      return false;
    }
    seen.add(charLower);
  }

  return true;
}
