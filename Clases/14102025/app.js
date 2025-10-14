let inventario = [];
function mostrarMenu(){
    return parseInt(prompt(
        `Opciones disponibles
        1.- Agregar producto
        2.- Mostrar todos los productos
        3.- Buscar producto por nombre
        4.- Salir
        Elige una opcion:`    
    ));

function agregarProducto(){
    let nombre = prompt ("Ingresa el nombre del producto:");
    let cantidad = parseInt(prompt("Ingresa la cantidad del producto"));
    let precio = parseFloat(prompt("Ingresa el precio del producto"));

    if (cantidad > 0 && precio > 0){
        let producto = {
            nombre: nombre,
            cantidad: cantidad,
            precio: precio
        }; //Para agregar 

        inventario.push(producto);
        alert("Producto agregado");
    }else{
        alert("Cantidad y precio deben de ser numeros positivos");
    }
}

function mostrarProducto(){
    if(inventario.length === 0){
        alert("No hay productos en el inventario");
    } else {
        let mensaje = "Productos en el inventario:\n";
        for(let i=0; i < inventario.length; i++){
            mensaje += `${i + 1}. Nombre: ${inventario[i].nombre}, Cantidad: ${inventario[i].cantidad}, Precio: $${inventario[i].precio.toFixed(2)}\n`;
        }
        alert(mensaje);
    }

function buscarProducto(){
    let nombreBusqueda = prompt("Ingresa el nombre del producto a buscar:");
    let encontrados = inventario.filter(producto => producto.nombre.toLowerCase() === nombreBusqueda.toLowerCase());        
    if(encontrados.length > 0){
        let mensaje = "Productos encontrados:\n";}
        encontrados.forEach(producto => {
            mensaje += `Nombre: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: $${producto.precio.toFixed(2)}\n`;
        });
        alert(mensaje);
    } else {
        alert("No se encontraron productos con ese nombre");
    }           
}
let opcion;
do {
    opcion = mostrarMenu(); 
    switch(opcion){
        case 1:
            agregarProducto();
            break;
        case 2:
            mostrarProducto();
            break;
        case 3:
            buscarProducto();
            break;
        case 4:
            alert("Saliendo del programa");
            break;
        default:
            alert("Opcion no valida, intenta de nuevo");
    }
} while (opcion !== 4);
}
