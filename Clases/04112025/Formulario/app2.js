const usuarios = []; // Arreglo para almacenar los usuarios
const form = document.getElementById('userForm');
const salida = document.getElementById('salidaJson');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtiene los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    // Crea un objeto usuario
    const nuevoUsuario = {
        nombre: nombre,
        email: email
    };
    // Agrega el nuevo usuario al arreglo
    usuarios.push(nuevoUsuario);
    // Muestra el arreglo en formato JSON
    salida.textContent = JSON.stringify(usuarios, null, 2);
    // Opcional: Resetea el formulario
    form.reset();
});