let contador = 0;
console.log("a");
const intervals0 = setInterval(() => {
  contador++;
}, 4);

console.log("b");
const intervals1 = setInterval(() => {
  contador *= 2;
}, 10);

console.log("c");
const intervals2 = setInterval(() => {
  console.log(contador);
  console.log("=================== fim do loop");
  contador = 0;
}, 2000);
console.log("d");

setTimeout(() => {
  console.log("f");
  clearInterval(intervals0);
  clearInterval(intervals1);
  clearInterval(intervals2);
}, 10000);
console.log("e");
