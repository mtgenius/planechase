export default function flatten<T>(acc: readonly T[], curr: readonly T[]): T[] {
  return acc.concat(curr);
}
