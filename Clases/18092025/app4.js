var productos = [
    {nombre: 'Whisky', precio: 1200},
    {nombre: 'Vodka', precio: 800},
    {nombre: 'Cerveza', precio: 150},
    {nombre: 'Vino Tinto', precio: 600}
];

var carrito = [];

// Función para mostrar el menú principal
function mostrarMenuPrincipal() {
    var menu = "Bienvenido a la tienda de licores 🍷\n";
    menu += "Seleccione una opción:\n";
    for (var i = 0; i < productos.length; i++) {
        menu += (i + 1) + ". Comprar " + productos[i].nombre + " - $" + productos[i].precio + "\n";
    }
    menu += (productos.length + 1) + ". Ver Carrito y Total\n";
    menu += (productos.length + 2) + ". Modificar Carrito\n";
    menu += (productos.length + 3) + ". Menú Administrador\n";
    menu += (productos.length + 4) + ". Salir\n";
    return menu;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
    var productoSeleccionado = productos[index];
    carrito.push(productoSeleccionado);
    console.log('Bebida "' + productoSeleccionado.nombre + '" agregada al carrito.');
}

// Función para mostrar el carrito y el total
function mostrarCarritoYTotal() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
    } else {
        var mensajeCarrito = "Carrito de compras:\n";
        var total = 0;
        for (var i = 0; i < carrito.length; i++) {
            mensajeCarrito += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio + "\n";
            total += carrito[i].precio;
        }
        mensajeCarrito += "\nTotal: $" + total;
        console.log(mensajeCarrito);
    }
}

// Función para modificar el carrito (eliminar productos)
function modificarCarrito() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
        return;
    }

    var mensaje = "Seleccione el número del producto que desea eliminar:\n";
    for (var i = 0; i < carrito.length; i++) {
        mensaje += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio + "\n";
    }

    var opcionEliminar = prompt(mensaje);
    opcionEliminar = Number(opcionEliminar);

    if (isNaN(opcionEliminar) || opcionEliminar < 1 || opcionEliminar > carrito.length) {
        console.log("Opción no válida.");
    } else {
        var eliminado = carrito.splice(opcionEliminar - 1, 1)[0];
        console.log('Producto "' + eliminado.nombre + '" eliminado del carrito.');
    }
}

// Función del menú de administrador para agregar productos al catálogo
function menuAdministrador() {
    var nombreNuevo = prompt("Ingrese el nombre del nuevo producto:");
    var precioNuevo = prompt("Ingrese el precio del producto:");
    precioNuevo = Number(precioNuevo);

    if (!nombreNuevo || isNaN(precioNuevo) || precioNuevo <= 0) {
        console.log("Datos inválidos. No se agregó el producto.");
    } else {
        productos.push({ nombre: nombreNuevo, precio: precioNuevo });
        console.log('Producto "' + nombreNuevo + '" agregado al catálogo por el administrador.');
    }
}

// Bucle principal de la tienda
var opcion;
do {
    opcion = prompt(mostrarMenuPrincipal());
    opcion = Number(opcion);

    if (isNaN(opcion) || opcion < 1 || opcion > productos.length + 4) {
        console.log("Opción no válida.");
    } else if (opcion >= 1 && opcion <= productos.length) {
        agregarAlCarrito(opcion - 1);
    } else if (opcion === productos.length + 1) {
        mostrarCarritoYTotal();
    } else if (opcion === productos.length + 2) {
        modificarCarrito();
    } else if (opcion === productos.length + 3) {
        menuAdministrador();
    }
} while (opcion !== productos.length + 4);

console.log("Gracias por visitar la tienda de licores.");
