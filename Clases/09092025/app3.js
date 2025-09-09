// Declaramos el carrito inicial
const frutas = [""];
console.log("Carrito inicial:", frutas);

// Preguntar al usuario si desea agregar frutas
let seguir = true;

while (seguir) {
  let respuesta = confirm("¿Quiere agregar una fruta al carrito?");
  
  if (respuesta) {
    let nuevaFruta = prompt("Escribe el nombre de la fruta que quieres agregar:");
    if (nuevaFruta) {
      frutas.push(nuevaFruta); // Agrega la fruta al final de la lista
      console.log(`Agregaste: ${nuevaFruta}`); // Imprime la ultima fruta
    } else {
      console.log("No escribiste ninguna fruta.");
    }
  } else {
    seguir = false; // Rompe el ciclo si dice que no
  }
}

// Al final mostrar todo el carrito
console.log("Carrito final de frutas:");
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}
