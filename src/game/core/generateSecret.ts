export function generateSecret(
  length: number = 4,
  base: number = 10,
  random = Math.random,
): string {
  if (length > base) {
    throw new RangeError("Length cannot be greater than base");
  }
  const secretSet = new Set();
  const allowed = "0123456789abcdef";
  while (secretSet.size < length) {
    const char = allowed[Math.floor(random() * base)];
    secretSet.add(char);
  }
  return Array.from(secretSet).join("");
}

export function generateNotRandom() {
  let counter = 0;

  return () => {
    const result = counter;
    counter += 1;
    return result / 10;
  };
}
