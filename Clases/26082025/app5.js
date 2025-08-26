// Programa que hace una suma, una resta, una multiplicación, una división y un modulo
let numero1 = prompt("Ingresa el numero1:");
let numero2 = prompt("Ingresa el numero2:");

console.log(typeof numero1);  // string
numero1 = parseInt(numero1);
numero2 = parseInt(numero2);
console.log(typeof numero1);  // number

// Operaciones
console.log("Suma: " + (numero1 + numero2));
console.log("Resta: " + (numero1 - numero2));
console.log("Multiplicación: " + (numero1 * numero2));
console.log("División: " + (numero1 / numero2));
console.log("Módulo: " + (numero1 % numero2));
