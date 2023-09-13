
function nombreAleatorio() {
  return nombres[Math.floor(Math.random() * nombres.length)];
}

function apellidoAleatorio() {
  return apellidos[Math.floor(Math.random() * apellidos.length)];
}

function generarEdadAleatoria() {
  return Math.floor(Math.random() * 80) + 18;
}

function generarDniAleatorio() {
  return Math.floor(Math.random() * 49000000) + 1000000;
}

function generarSueldosAleatorios(cantidad) {
  const sueldosAleatorios = new Array(cantidad);
  for (let i = 0; i < cantidad; i++) {
    sueldosAleatorios[i] = Math.floor(Math.random() * 900000) + 100000;
  }
  return sueldosAleatorios;
}

function generarMatrizPersonas(cantidad) {
  const sueldosAleatorios = generarSueldosAleatorios(cantidad);
  const matrizGenerada = new Array(cantidad);
  for (let f = 0; f < cantidad; f++) {
    matrizGenerada[f] = [nombreAleatorio(), apellidoAleatorio(), generarEdadAleatoria(), generarDniAleatorio(), sueldosAleatorios[f]];
  }
  return matrizGenerada;
}

function partition(array, low, high) {
  const pivot = array[high][3];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j][3] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}

function quickSort(array, low, high) {
  if (low < high) {
    const pi = partition(array, low, high);
    quickSort(array, low, pi - 1);
    quickSort(array, pi + 1, high);
  }
}

let nombres = [
  "Juan", "Maria", "Luis", "Ana", "Carlos", "Laura", "Jose", "Sofia", "Pedro", "Elena",
  "Andres", "Monica", "Fernando", "Isabel", "Gabriel", "Valentina", "Miguel", "Lucia", "Raul", "Carmen",
  "Diego", "Camila", "Hector", "Adriana", "Alejandro", "Paula", "Javier", "Natalia", "Antonio", "Daniela",
  "Ricardo", "Victoria", "Jorge", "Valeria", "Fabian", "Marcela", "Sebastian", "Julia", "Emilio", "Renata",
  "Manuel", "Julieta", "Francisco", "Isabella", "Arturo", "Florencia", "Roberto", "Gabriela", "Alberto", "Lorena"
];

let apellidos = [
  "Garcia", "Rodriguez", "Lopez", "Martinez", "Perez", "Gonzalez", "Hernandez", "Sanchez", "Ramirez", "Flores",
  "Moreno", "Diaz", "Romero", "Alvarez", "Torres", "Ruiz", "Jimenez", "Ramos", "Cruz", "Ortega",
  "Vargas", "Castillo", "Fernandez", "Silva", "Navarro", "Pacheco", "Mendoza", "Cortes", "Vega", "Rojas",
  "Morales", "Guerrero", "Paredes", "Salazar", "Carrasco", "Alvarez", "Ovalle", "Soto", "Gutierrez", "Orellana",
  "Rios", "Sandoval", "Valenzuela", "Molina", "Chavez", "Araya", "Pena", "Vasquez", "Lara", "Gomez"
];
console.time("Generación de datos");
const cantidadDatos = 30000000;
const sueldosRandom = generarSueldosAleatorios(cantidadDatos);
const matrizRandom = generarMatrizPersonas(cantidadDatos);
console.timeEnd("Generación de datos");

console.time("Ordenamiento");
quickSort(matrizRandom, 0, matrizRandom.length - 1);
console.timeEnd("Ordenamiento");


const dniBuscado = matrizRandom[Math.floor(Math.random() * matrizRandom.length)][3];
console.time("Búsqueda");
const indiceEncontrado = búsquedaBinaria(matrizRandom, dniBuscado);

if (indiceEncontrado != -1) {
  console.log(`DNI encontrado ${dniBuscado} en el índice: ${indiceEncontrado} cobra un total de ${sueldosRandom[indiceEncontrado]}`);
} else {
  console.log("DNI no encontrado en la matriz.");
}

function búsquedaBinaria(arr, x) {
  let baja = 0;
  let alta = arr.length - 1;

  while (baja <= alta) {
    let medio = Math.floor((baja + alta) / 2);

    if (arr[medio][3] == x) {
      return medio;
    } else if (arr[medio][3] < x) {
      baja = medio + 1;
    } else {
      alta = medio - 1;
    }
  }

  return -1;
}
console.timeEnd("Búsqueda");
