export const cache = new Map();
export function countPossibleSecrets(length: number, base: number): number {
  if (length === 0) return 1;
  if (length > base) throw new RangeError("Length cannot be greater than base");

  if (cache.has(`${length}-${base}`)) {
    return cache.get(`${length}-${base}`);
  }
  const count = base * countPossibleSecrets(length - 1, base - 1);
  cache.set(`${length}-${base}`, count);
  return count;
}
