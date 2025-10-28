const fs = require('node:fs'); // Sin esapcios si no da error

const estado = fs.statSync('./carta.txt');
console.log('estado/isFile():', estado.isFile());
console.log('estado/isDirectory():', estado.isDirectory());
console.log('Tamaño en bytes:', estado.size);
console.log('Fecha de creación:', estado.birthtime);
console.log('Última modificación:', estado.mtime);