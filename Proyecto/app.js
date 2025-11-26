const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Frameworks desde node_modules
app.use('/materialize', express.static(__dirname + '/node_modules/materialize-css/dist'));
app.use('/nes', express.static(__dirname + '/node_modules/nes.css/css'));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sesión
app.use(session({
    secret: 'superclave',
    resave: false,
    saveUninitialized: false
}));

// Middleware global
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Protección
function requireLogin(req, res, next) {
    if (!req.session.user) return res.redirect('/login');
    next();
}

// Conexión MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_database'
});

// Login normal
app.get('/login', (req, res) => {
    res.render('login', {
        validated: false,
        notFound: false
    });
});

// LOGIN VALIDADO (muestra entrar/agagregar)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email=? AND password=?",
        [email, password],
        (err, rows) => {

            if (!rows || rows.length === 0) {
                return res.render('login', {
                    validated: false,
                    notFound: true
                });
            }

            req.session.tempUser = rows[0];

            res.render('login', {
                validated: true,
                notFound: false
            });
        }
    );
});

// Agregar Usuario desde login
app.post('/register-from-login', (req, res) => {
    const { name, email, password } = req.body;

    db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        () => res.redirect('/login')
    );
});

// Página principal
app.get('/', (req, res) => {

    if (req.session.tempUser) {
        req.session.user = req.session.tempUser;
        delete req.session.tempUser;
    }

    if (!req.session.user) return res.redirect('/login');

    db.query("SELECT * FROM users", (err, users) => {
        res.render('index', { users });
    });
});

// Agregar Usuario pagina principal
app.post('/add-user', requireLogin, (req, res) => {
    const { name, email, birthday, password } = req.body;

    db.query(
        "INSERT INTO users (name, email, birthday, password) VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?)",
        [name, email, birthday, password],
        () => res.redirect('/')
    );
});

// Editar Usuario
app.post('/api/update/:id', requireLogin, (req, res) => {
    const { name, email, birthday } = req.body;

    db.query(
        "UPDATE users SET name=?, email=?, birthday=STR_TO_DATE(?, '%d/%m/%Y') WHERE id=?",
        [name, email, birthday, req.params.id],
        err => {
            if (err) return res.status(500).json({ error: err });
            res.json({ ok: true });
        }
    );
});

// Eliminar Usuario
app.get('/delete/:id', requireLogin, (req, res) => {
    db.query("DELETE FROM users WHERE id=?", [req.params.id], () => res.redirect('/'));
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
});

// Servidor
app.listen(3000, () =>
    console.log("Servidor en http://localhost:3000")
);