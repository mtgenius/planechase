export default function shuffle<T>(arr: readonly T[]): T[] {
  const newArr: T[] = [...arr];

  for (let x: number = newArr.length - 1; x > 0; x--) {
    const y: number = Math.floor(Math.random() * (x + 1));
    [newArr[x], newArr[y]] = [newArr[y], newArr[x]];
  }

  return newArr;
}
