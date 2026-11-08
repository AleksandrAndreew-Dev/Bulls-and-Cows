export function generateSecret(
  length: number,
  base: number,
  random = Math.random,
): string {
  if (length > base) {
    throw new RangeError("Length cannot be greater than base");
  }
  const secretSet = new Set();
  while (secretSet.size < length) {
    secretSet.add(Math.floor(random() * base));
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
