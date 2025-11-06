const express = require('express');
const path = require('path');
const pagesRouter = require('./routes/pages');
const app = express();
app.use('/', pagesRouter);

app.get('/', (req, res) => { // Esto redirige a la pagina 1 por defecto
    res.redirect('/page1');
});

const port = 3025;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
