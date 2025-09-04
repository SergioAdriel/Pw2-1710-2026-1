var frutas = ["Uva","Sandia","Mango","Papaya","Melon"];

for (let fruta in frutas){
    console.log(fruta);  // Imprime los indices 
}

for (let fruta of frutas){
    console.log(fruta); // Imprime los elementos
}