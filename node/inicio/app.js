const os = require('node:os');

console.log('Operating System Information:');
console.log("--------------------------------");
console.log("Nombre del sistema operativo:", os.platform());
console.log("Versión del sistema operativo:", os.release());
console.log("Arquitectura del sistema:", os.arch());