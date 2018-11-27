export default function shuffle(arr: any[]): any[] {
  for (let x: number = arr.length - 1; x > 0; x--) {
    const y: number = Math.floor(Math.random() * (x + 1));
    [ arr[x], arr[y] ] = [ arr[y], arr[x] ];
  }
  return arr;
}
