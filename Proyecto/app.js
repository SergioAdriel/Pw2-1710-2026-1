const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

const app = express();

// Middlewares para parseo y archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Frameworks/CSS desde node_modules
app.use('/materialize', express.static(__dirname + '/node_modules/materialize-css/dist'));
app.use('/nes', express.static(__dirname + '/node_modules/nes.css/css'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de sesión
app.use(session({
    secret: 'superclave',
    resave: false,
    saveUninitialized: false
}));

// Evitar caché para que el header cambie al instante
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Hacer disponible el usuario en las vistas (res.locals.user)
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Middleware de protección: requiere sesión iniciada
function requireLogin(req, res, next) {
    if (!req.session.user) return res.redirect('/login');
    next();
}

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_database'
});

// Rutas de login
app.get('/login', (req, res) => {
    res.render('login', {
        validated: false,
        notFound: false,
        toast: null,
        email: "",
        password: ""
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email=? AND password=?", [email, password],
        (err, rows) => {
            if (err || !rows || rows.length === 0) {
                return res.render('login', {
                    validated: false,
                    notFound: true,
                    toast: "Credenciales incorrectas",
                    email,
                    password
                });
            }

            req.session.user = rows[0]; // sesión iniciada

            return res.render('login', {
                validated: true,
                notFound: false,
                toast: "Acceso verificado",
                user: rows[0],
                email: "",
                password: ""
            });
        }
    );
});

// Registro desde la vista de login
app.post('/register-from-login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", {
            validated: true,
            notFound: false,
            toast: "Completa todos los campos"
        });
    }

    db.query("SELECT * FROM users WHERE email=?", [email], (err, rows) => {
        if (rows.length > 0) {
            return res.render("login", {
                validated: true,
                notFound: false,
                toast: "El correo ya está registrado"
            });
        }

        db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password],
            err2 => {
                if (err2) {
                    return res.render("login", {
                        validated: true,
                        notFound: false,
                        toast: "Error al registrar usuario"
                    });
                }

                return res.render("login", {
                    validated: true,
                    notFound: false,
                    toast: "Usuario registrado correctamente"
                });
            }
        );
    });
});

// Página principal (requiere login): lista usuarios
app.get('/', requireLogin, (req, res) => {
    db.query("SELECT * FROM users", (err, users) => {
        res.render('index', {
            users,
            loggedUser: req.session.user,
            toast: null
        });
    });
});

// Agregar nuevo usuario (requiere login)
app.post('/add-user', requireLogin, (req, res) => {
    const { name, email, birthday, password } = req.body;

    db.query("SELECT * FROM users WHERE email=?", [email], (err, rows) => {
        if (rows.length > 0) {
            return res.render("index", {
                users: [],
                loggedUser: req.session.user,
                toast: "Ese correo ya está registrado"
            });
        }

        db.query(
            "INSERT INTO users (name, email, birthday, password) VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?)",
            [name, email, birthday, password],
            err2 => res.redirect('/')
        );
    });
});

// Actualizar usuario vía API (requiere login)
// Nota: no permite cambiar el email de otro usuario
app.post('/api/update/:id', requireLogin, (req, res) => {
    const userId = parseInt(req.params.id);
    const loggedId = req.session.user.id;
    const { name, email, birthday } = req.body;

    if (email && userId !== loggedId) {
        return res.status(403).json({ error: "No puedes cambiar el correo de otro usuario." });
    }

    let SQL = "UPDATE users SET name=?, birthday=STR_TO_DATE(?, '%d/%m/%Y')";
    let params = [name, birthday];

    if (email) {
        SQL += ", email=?";
        params.push(email);
    }

    SQL += " WHERE id=?";
    params.push(userId);

    db.query(SQL, params, err => {
        if (err) return res.status(500).json({ error: "Error al actualizar usuario" });
        res.json({ ok: true });
    });
});

// Cambiar contraseña vía API (requiere login)
// Solo el usuario autenticado puede cambiar su propia contraseña
app.post('/api/change-password/:id', requireLogin, (req, res) => {
    const userId = parseInt(req.params.id);
    const loggedId = req.session.user.id;
    const { currentPassword, newPassword } = req.body;

    if (userId !== loggedId) {
        return res.status(403).json({ error: "No puedes cambiar la contraseña de otro usuario." });
    }

    db.query("SELECT password FROM users WHERE id=?", [userId], (err, rows) => {
        if (!rows.length || rows[0].password !== currentPassword) {
            return res.status(400).json({ error: "Contraseña actual incorrecta" });
        }

        db.query("UPDATE users SET password=? WHERE id=?", [newPassword, userId], err2 => {
            if (err2) return res.status(500).json({ error: "Error al actualizar contraseña" });
            res.json({ ok: true });
        });
    });
});

// Eliminar usuario vía API (requiere login)
// Verifica contraseña antes de eliminar
app.post('/api/delete/:id', requireLogin, (req, res) => {
    const userId = req.params.id;
    const { password } = req.body;

    db.query("SELECT password FROM users WHERE id=?", [userId], (err, rows) => {
        if (!rows.length || rows[0].password !== password) {
            return res.status(403).json({ error: "Contraseña incorrecta" });
        }

        db.query("DELETE FROM users WHERE id=?", [userId], err2 => {
            if (err2) return res.status(500).json({ error: "Error al eliminar usuario" });
            res.json({ ok: true });
        });
    });
});

// Logout: destruir sesión
app.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
});

// Inicio del servidor
app.listen(3000, () =>
    console.log("Servidor en http://localhost:3000")
);
