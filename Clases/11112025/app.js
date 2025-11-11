const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_database',
    port: 3306,
});

const port = 3000;

connection.connect((err) => {
    if (err) {
        console.error('Error al conectarse a la base de datos:', err);
        process.exit(1);
    }
    console.log('Si lees esto, eres muy guapo y MySQL funciona :D.');

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});

app.get('/', (req, res) => {
    const consulta = 'SELECT * FROM users';
    connection.query(consulta, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving data from database.');
            return;
        }
        console.log('Query results:', results); // imprime los resultados en la consola
        res.json(results);
    });
});

process.on('SIGINT', () => {
    connection.end(() => {
        console.log('Database connection closed.');
        process.exit(0);
    });
});