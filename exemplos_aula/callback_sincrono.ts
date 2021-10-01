console.log("a");
const impares = [1, 3, 5, 7, 9];
console.log("b");
const squares = impares.map((n, i) => {
  console.log("c", i);
  return n ** 2;
});
console.log("d");
console.log(squares);
