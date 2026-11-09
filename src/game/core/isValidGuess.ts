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

  const lower = guess.toLowerCase();
  const isValidDigit = createDigitValidator(base);

  const allDigitsValid = [...lower].every(isValidDigit);
  if (!allDigitsValid) return false;

  const allUnique = new Set([...lower]).size === lower.length;
  return allUnique;
}
