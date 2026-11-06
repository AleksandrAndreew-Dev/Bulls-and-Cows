// export function createDigitValidator(base) → (char) => boolean

export function createDigitValidator(base: number): (char: string) => boolean {
  const allowed = "0123456789abcdef";
  return (char: string): boolean => {
    if (char.length !== 1) return false;
    return allowed.slice(0, base).includes(char.toLowerCase());
  };
}
