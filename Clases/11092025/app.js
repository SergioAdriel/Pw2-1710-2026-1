// Arreglo vacio
let nombres = [""];

// Agregar nombre al arreglo
function agregarNombre(){
    let nombre = prompt("Agrega el nombre: ")
    if(nombre){
        nombres.push
        alert(`Nombre ${nombre} agregado exitosamente`)
    }else{
        alert(`El nombre esta vacio`)
    }
}

function mostrarNombres{
    if(nombres.length===0){
        alert(`Arreglo Vacio`);
    }else{
        let mensaje = "Nombres almacenados: \n"
        nombres.forEach((nombre, i)=> {
            mensaje += `${i+1}. ${nombre}\n`; // Al indice se le suma 1 
        }); //Nombre va a ir aterando en el arreglo
        alert(mensaje); // Imprimiria Nombres almacenados: i nombre
    }
}


