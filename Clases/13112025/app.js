// Importa el framework Express para crear el servidor web
const express = require('express');

// Importa mysql2 para conectarse a MySQL
const mysql = require('mysql2');

// Módulo path para manejar rutas de archivos
const path = require('path');

// Crea la aplicación de Express
const app = express();

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Middleware para parsear datos de formularios (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public" (css, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Indicar la carpeta donde estarán las vistas (archivos .ejs)
app.set('views', path.join(__dirname, 'views'));

// Crear la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',      // Servidor de la base de datos
    user: 'root',           // Usuario de MySQL
    password: '123456',     // Contraseña del usuario
    database: 'my_database',// Nombre de la base de datos
    port: 3306,             // Puerto de MySQL
});

// Puerto donde escuchará el servidor
const port = 3000;

// Intentar conectar a la base de datos
connection.connect((err) => {
    if (err) {
        // Mensaje de error en consola si falla la conexión
        console.error('Error al conectarse a la base de datos:', err);
        process.exit(1); // Termina la aplicación si no hay conexión
    }

    // Mensaje si la conexión fue exitosa
    console.log('Si lees esto, eres muy guapo y MySQL funciona :D.');

    // Iniciar el servidor HTTP en el puerto especificado
    app.listen(port, () => {
        console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
});

// RUTA PRINCIPAL: Renderiza la vista "index" con la lista de usuarios
app.get('/', (req, res) => {
    const query = "SELECT * FROM users"; // Consulta para obtener todos los usuarios

    connection.query(query, (err, users) => {
        if (err) {
            // Error al consultar los usuarios
            console.error('Error al consultar usuarios:', err);
            return res.status(500).send('Error al consultar usuarios.');
        }

        // Renderiza la vista "index.ejs" y le pasa la lista de usuarios
        res.render('index', { users });
    });
});

// AGREGAR USUARIO: Maneja el formulario para crear un nuevo usuario
app.post('/add-user', (req, res) => {
    const { name, email } = req.body; // Obtiene nombre y correo del cuerpo de la petición

    const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';

    // Ejecuta la inserción con parámetros para evitar SQL injection
    connection.query(insertQuery, [name, email], (err, results) => {
        if (err) {
            // Error al insertar el usuario
            console.error('Error al insertar usuario:', err);
            return res.status(500).send('Error al agregar usuario.');
        }

        // Redirige a la página principal después de agregar
        res.redirect('/');
    });
});

// ELIMINAR USUARIO: Elimina un usuario según su ID
app.get('/delete/:id', (req, res) => {
    const userId = req.params.id; // Toma el id de la URL

    connection.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
        if (err) {
            // Error al eliminar el usuario
            console.error('Error al eliminar usuario:', err);
            return res.status(500).send('Error al eliminar usuario.');
        }

        // Redirige de vuelta a la lista de usuarios
        res.redirect('/');
    });
});

// Manejo de la señal SIGINT (Ctrl + C) para cerrar la conexión ordenadamente
process.on('SIGINT', () => {
    connection.end(() => {
        console.log('Conexión a la base de datos cerrada.');
        process.exit(0);
    });
});

// Solicitar datos del usuario para mostrarlos en el formulario de edición
app.get('/edit/:id', (req, res) => {
    const userId = req.params.id; // Obtiene el id de la URL

    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            // Error al obtener el usuario
            console.error('Error al obtener usuario:', err);
            return res.status(500).send('Error al obtener usuario.');
        }

        if (results.length === 0) {
            // Si no existe el usuario con ese id
            return res.status(404).send('Usuario no encontrado.');
        }

        // Renderiza la vista "edit.ejs" con los datos del usuario
        res.render('edit', { user: results[0] });
    });
});

// Actualizar datos del usuario (cuando se envía el formulario de edición)
app.post('/edit/:id', (req, res) => {
    const userId = req.params.id;       // Id del usuario a actualizar
    const { name, email } = req.body;   // Nuevos datos del formulario

    const updateQuery = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

    connection.query(updateQuery, [name, email, userId], (err) => {
        if (err) {
            // Error al actualizar el usuario
            console.error('Error al actualizar usuario:', err);
            return res.status(500).send('Error al actualizar usuario.');
        }

        // Redirige a la lista de usuarios después de actualizar
        res.redirect('/');
    });
});
