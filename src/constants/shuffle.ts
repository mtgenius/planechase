export default function shuffle<T>(arr: T[]): T[] {
  const nArr: T[] = [ ...arr ];
  for (let x: number = nArr.length - 1; x > 0; x--) {
    const y: number = Math.floor(Math.random() * (x + 1));
    [ nArr[x], nArr[y] ] = [ nArr[y], nArr[x] ];
  }
  return nArr;
}
