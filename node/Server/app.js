const http = require('http');
const port = 3026;
const server = http.createServer((req, res) => { // Funcion flecha
  res.writeHead(200, {"content-type" : 'text/plain'} ) // Codigo de estado OK
  res.end('Hola Mundo!\n');
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://127.0.0.1:${port}`);
});