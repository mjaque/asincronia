/**
 *   Descripción principal del fichero.
 *   Descripción secundaria.
 *   @author Miguel Jaque <mjaque@migueljaque.com>
 *   @license GPL-3.0-or-later
 *   Ref: https://spdx.org/licenses/
 *
 *   Ref JSDoc: https://jsdoc.app/
 */
'use strict'

//Supongamos que tenemos una función que tarda dos segundos en ejecutarse.
//y que, para evitar tener que esperar, hacemos que nos devuelva una promesa
function tardona() {
  let promesa = new Promise(fExito => {
    setTimeout(() => {
      //fExito es una función vacía que solo sirve para devolver el resultado a la función llamante
      console.log(fExito)
      let resultado = 42  //Obtiene el resultado
      fExito(resultado)   //Se lo devuelve a la función que lo gestionará
    }, 2000)              //Pero tarda mucho
  })
  return promesa
}

//Podemos crear una función asíncrona que espere a que termine tardona
async function fAsincrona() { //Es asíncrona porque tiene async
  console.log('Llamando a tardona');
  const resultado1 = await tardona();  //await suspende la ejecución de fAsincrona hasta obtener el resultado
  //conseguimos que se comporte casi como si fuera una función síncrona
  console.log('El resultado1 es ' + resultado1);
  //Una función asíncrona puede tener varios await
  const resultado2 = await tardona();
  console.log('El resultado2 es ' + resultado2);
}

console.log('Antes de llamar')
fAsincrona(); //Como es asíncrona, no nos quedaremos esperando
console.log('Después de llamar')


//Podemos utilizar funciones asíncronas para hacer peticiones AJAX
async function cargarJSON(fichero){
  let promesa = fetch(fichero)
    .then(r => r.json())
    .then(d => d)
  let datos = await promesa //Espero a tener los datos
  //Ahora los proceso
  console.log('Ya tengo los datos ' + datos)
}

cargarJSON('datos.json')
