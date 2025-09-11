// Arreglo vacio
let nombres = [""];

// Agregar nombre al arreglo
function agregarNombre(){
    let nombre = prompt("Agrega el nombre: ")
    if(nombre){
        nombres.push
        alert(`El nombre ${nombre} agregado exitosamente`)
    }else{
        alert(`El nombre esta vacio`)
    }
}

// Muestra nombres del arreglo
function mostrarNombres(){
    if(nombres.length===0){
        alert(`Arreglo Vacio`);
    }else{
        let mensaje = "Nombres almacenados: \n"
        // nombres.forEach((nombre, i)=> {
        //     mensaje += `${i+1}. ${nombre}\n`; // Al indice se le suma 1 
        // }); //Nombre va a ir aterando en el arreglo
        for (let i = 0; i < nombres.length; i++) {
            mensaje += `${i + 1}. ${nombres[i]}\n`;
        alert(mensaje); // Imprimiria Nombres almacenados: i nombre
    }
}

// Iniciar programa
mostrarMenu(){
    let opcion;

    do{
        opcion=prompt(`
            Seleccione una opcion
            1. Agregar Nombre
            2. Imprimir nombres
            3. Salir
            `)
    }
}

// Iniciar programa
mostrarMenu();