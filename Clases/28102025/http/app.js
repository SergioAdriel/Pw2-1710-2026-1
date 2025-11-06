const http = require('http');
const PORT = 3000;
const HOST = '127.0.0.1';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hola, Mundo!\n');
});

server.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
});
