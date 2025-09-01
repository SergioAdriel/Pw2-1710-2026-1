// Declaro 3 variables, las paso a entereo y hago que el usuario me las de
let a =  parseInt(prompt("Ingresa el primer numero: "));
let b =  parseInt(prompt("Ingresa el segundo numero: "));
let c =  parseInt(prompt("Ingresa el tercer numero: "));

// Imprimo los numeros para lo de igualdad
console.log("El primer numero es: ",a);
console.log("El segundo numero es: ",b);
console.log("El tercer numero es: ",c);

// Aqui saco el mayor con if
let mayor = a; // De inicio supongo que a es el mayor
if (b > mayor) { // Si b es mayor que el que tengo guardado
  mayor = b;
}
if (c > mayor) { // Si c es mayor que el que tengo guardado
  mayor = c;
}
console.log("\nEl mayor es:", mayor);

// Aqui saco el menor con if
let menor = a; // De inicio supongo que a es el menor
if (b < menor) { // Si b es menor que el que tengo guardado
  menor = b;
}
if (c < menor) { // Si c es menor que el que tengo guardado
  menor = c;
}
console.log("El menor es:", menor);

// Aqui el ususario se le indica lo de las igualdades
if (a === b && b === c) { // Aca es un AND, los 3 tienen que ser iguales
  console.log("Los tres numeros son iguales");
} else if (a === b || a === c || b === c) { // Aca es un OR. con que dos de ellos sean iguales 
  console.log("Y dos numeros son iguales");
} else { 
  console.log("Y no hay numeros iguales"); // Esto regresa si ninguno es igual
}