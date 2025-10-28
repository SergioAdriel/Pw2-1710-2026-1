
// Creamos un arreglo vacío para guardar los productos del inventario
let inventario = [];

// Función para mostrar el menú y pedir la opción al usuario
function mostrarMenu() {
    // Mostramos las opciones y convertimos la respuesta a número
    return parseInt(prompt(
        `Opciones disponibles\n` +
        `1.- Agregar producto\n` +
        `2.- Mostrar todos los productos\n` +
        `3.- Buscar producto por nombre\n` +
        `4.- Salir\n` +
        `Elige una opción:`
    ));
}

// Función para agregar un producto al inventario
function agregarProducto() {
    let nombre = prompt("Ingresa el nombre del producto:");
    let cantidad = parseInt(prompt("Ingresa la cantidad del producto:"));
    let precio = parseFloat(prompt("Ingresa el precio del producto:"));

    // Validamos que la cantidad y el precio sean positivos
    if (cantidad > 0 && precio > 0) {
        // Creamos el objeto producto
        let producto = {
            nombre: nombre,
            cantidad: cantidad,
            precio: precio
        };
        // Lo agregamos al inventario
        inventario.push(producto);
        alert("Producto agregado correctamente!");
    } else {
        alert("Cantidad y precio deben ser números positivos");
    }
}

// Función para mostrar todos los productos del inventario
function mostrarProducto() {
    if (inventario.length === 0) {
        alert("No hay productos en el inventario");
    } else {
        let mensaje = "Productos en el inventario:\n";
        // Recorremos el inventario y armamos el mensaje
        for (let i = 0; i < inventario.length; i++) {
            mensaje += `${i + 1}. Nombre: ${inventario[i].nombre}, Cantidad: ${inventario[i].cantidad}, Precio: $${inventario[i].precio.toFixed(2)}\n`;
        }
        alert(mensaje);
    }
}

// Función para buscar un producto por nombre
function buscarProducto() {
    let nombreBusqueda = prompt("Ingresa el nombre del producto a buscar:");
    // Filtramos los productos que coincidan con el nombre (ignorando mayúsculas/minúsculas)
    let encontrados = inventario.filter(producto => producto.nombre.toLowerCase() === nombreBusqueda.toLowerCase());
    if (encontrados.length > 0) {
        let mensaje = "Productos encontrados:\n";
        encontrados.forEach(producto => {
            mensaje += `Nombre: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: $${producto.precio.toFixed(2)}\n`;
        });
        alert(mensaje);
    } else {
        alert("No se encontraron productos con ese nombre");
    }
}

// Variable para guardar la opción elegida por el usuario
let opcion;
// Usamos un ciclo do-while para mostrar el menú hasta que el usuario decida salir
do {
    opcion = mostrarMenu();
    switch (opcion) {
        case 1:
            agregarProducto(); // Llamamos a la función para agregar producto
            break;
        case 2:
            mostrarProducto(); // Llamamos a la función para mostrar productos
            break;
        case 3:
            buscarProducto(); // Llamamos a la función para buscar producto
            break;
        case 4:
            alert("Saliendo del programa. ¡Hasta luego!");
            break;
        default:
            alert("Opción no válida, intenta de nuevo");
    }
} while (opcion !== 4);
