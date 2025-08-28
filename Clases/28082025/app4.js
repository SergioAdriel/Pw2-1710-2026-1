// Declaro 3 variables, las paso a entereo y hago que el usuario me las de
let a =  parseInt(prompt("Ingresa el primer numero: "));
let b =  parseInt(prompt("Ingresa el segundo numero: "));
let c =  parseInt(prompt("Ingresa el tercer numero: "));

// Imprimo los numeros para lo de igualdad
console.log("El primer numero es: ",a);
console.log("El segundo numero es: ",b);
console.log("El tercer numero es: ",c);

// Existe Math, es el que estoy usando
console.log("\nEl mayor es:", Math.max(a, b, c));
console.log("El menor es:", Math.min(a, b, c));

// Aqui el ususario se le indica lo de las igualdades
if (a === b && b === c) { // Aca es un AND, los 3 tienen que ser iguales
  console.log("Los tres numeros son iguales");
} else if (a === b || a === c || b === c) { // Aca es un OR. con que dos de ellos sean iguales 
  console.log("Y dos numeros son iguales");
} else { 
  console.log("Y no hay numeros iguales"); // Esto regresa si ninguno es igual
}