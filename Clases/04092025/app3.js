function sumar (n1,n2){
    return parseInt(n1)+parseInt(n2);
}
function resta (n1,n2){
    return parseInt(n1)-parseInt(n2);
}
function multiplicacion (n1,n2){
    return parseInt(n1)*parseInt(n2);
}
function division (n1,n2){
    return parseInt(n1)/parseInt(n2);
}
var numero1 = prompt("Ingresa el Primer Numero:");
var numero2 = prompt("Ingresa el Segundo Numero:");

var resultadoSuma = sumar(numero1,numero2);
var resultadoResta = resta(12,35);
var resultadoMultiplicacion = multiplicacion(239,3290);
var resultadoDivision = division(230,21);

console.log(resultadoSuma);
console.log(resultadoResta);
console.log(resultadoMultiplicacion);
console.log(resultadoDivision);

