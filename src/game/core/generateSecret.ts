export function generateSecret(
  length: number = 4,
  base: number = 10,
  random = Math.random,
): string {
  if (length > base) {
    throw new RangeError("Length cannot be greater than base");
  }

  const allowed = "0123456789abcdef";
  const pick = (acc: Set<string>): string => {
    if (acc.size === length) {
      return Array.from(acc).join("");
    }

    const char = allowed.charAt(Math.floor(random() * base));

    if (acc.has(char)) {
      return pick(acc);
    }
    return pick(new Set([...acc, char]));
  };

  return pick(new Set());
}

export function generateNotRandom() {
  let counter = 0;

  return () => {
    const result = counter;
    counter += 1;
    return result / 10;
  };
}
