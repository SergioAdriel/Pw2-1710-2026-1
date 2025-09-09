const frutas = ["Banana"];
frutas.push("Sandia"); // Al final
frutas.push("Aguacate"); // Al final
frutas.push("Manzana"); // Al final
frutas.push("Kiwi"); // Al final
frutas.push("Naranja"); // Al final
frutas.unshift("Papaya"); // Al principio
console.log(frutas);

for (let i = 0; i < frutas.length; i++) { // declaramos la variable i, decimos que i es menor a la longiutd total del arreglo y vamos recorriendo uno a uno
    console.log(frutas.length); // corregido: frutas.length en lugar de length.frutas
}

console.log("Separador")

// Eliminar el ultimo elemento
frutas.pop(); // corregido: se agregan paréntesis para ejecutar la función

for (let i = 0; i < frutas.length; i++) { // declaramos la variable i, decimos que i es menor a la longiutd total del arreglo y vamos recorriendo uno a uno
    console.log(frutas.length); // corregido: frutas.length en lugar de length.frutas
}

// Eliminar el primer elemento
frutas.shift(); // corregido: se agregan paréntesis para ejecutar la función

for (let i = 0; i < frutas.length; i++) { // declaramos la variable i, decimos que i es menor a la longiutd total del arreglo y vamos recorriendo uno a uno
    console.log(frutas.length); // corregido: frutas.length en lugar de length.frutas
}

// Aca estamos tratando de modificar una constante, tons no se puede
// const puerto = 3306;
// puerto = 3308;
// console.log(puerto);

