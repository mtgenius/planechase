export default (arr) => {
  for (let x = arr.length - 1; x > 0; x--) {
    const y = Math.floor(Math.random() * (x + 1));
    [ arr[x], arr[y] ] = [ arr[y], arr[x] ];
  }
};
