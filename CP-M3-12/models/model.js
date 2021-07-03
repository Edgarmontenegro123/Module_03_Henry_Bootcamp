'use strict';

var characters = [];

var families = [];


module.exports = {
  reset: function(){
    // No es necesario modificar esta función (Ya está completa)
    characters = [];
    families = [];
  },
  // ==== COMPLETEN LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====
  listCharacter: function(family, pluckName){
    // Devuelve un arreglo con todos los personajes
    // Si recibe un (apellido) nombre de familia como parámetro debería filtrar solo los personajes de ella
    // Si recibe un segundo parámetro en true debe devolver únicamente los nombres de los personajes
/*     const familyName = characters.filter(f => f.family === family);
    let names = [];
 */
  /*   for(let i = 0; i < familyName.length; i++){
      names.push(familyName[i].name);
    }
    if(families.includes(family)){
        if(pluckName){
          return names;
        }
        else{
          return familyName;
        }
    }
    else{
      return characters;
    }    */

    if(!family) return characters;
    if(!pluckName){
      return characters.filter(obj => obj.familyId === families.indexOf(family) + 1)
    }
    else{
      return characters.filter(obj => obj.familyId === families.indexOf(family) + 1).map(obj => obj.name)
    }
  },
  addFamily: function(name){
    // Agrega el apellido de una nueva familia verificando que no exista
    // Debe retornar el nombre de la familia agregado o existente

    !families.includes(name) ? families.push(name) : families.includes(name)
   /*  if(!families.includes(name)){
      return;
    }else{
      families.push(name)
    } */
  },
  listFamilies: function(){
    // Devuelve un arreglo con todas las familias
    return families;
  },
  addCharacter: function(name, age, family){
    // Agrega un nuevo personaje, inicialmente sus frases (quotes) deben estar "vacias"
    // Adicionalmente va a ser necesario guardar el número de familia y no su nombre
    // El número de familia debe empezar desde 1 y no desde 0.
    // Debe retornar el personaje creado
    let familyId = families.indexOf(family) + 1;
    let quotes = [];
    let newCharacter = {name, age, /* family, */ quotes, familyId}; // No agregar family porque no va a pasar un test en route
   
 /*   if (!families.includes(family)) return;
    else characters.push(newCharacter)
  }, */
  if(!families.includes(family)) return;
  else{
    characters.push(newCharacter)
    return newCharacter
}},

  addQuote: function(name, quote){
    // Agrega una nueva frase a un personaje en particular con el formato:
    // {text: "Este es el texto de la frase", season: 3}
   /*  quote = {text, season}; */
  
    if(!quote.season){
      quote.season = false;
    }
      for(let i = 0; i < characters.length; i++){
        if(quote.text && quote.text !== ''){
          if(characters[i].name === name){
            characters[i].quotes.push(quote);
          }
        }
      } 
    },

  showQuotes: function(name){
    // Devuelve todas las frases de un personaje en particular
    let initialArray = [];
    let selectedCharacter = characters.find(e => e.name === name);
   /*  if(selectedCharacted){
      return selectedCharacted.quotes
    }
    else{
      return initialArray
    }  */
    return selectedCharacter ? selectedCharacter.quotes : initialArray;
      
  /*   for(let i = 0; i < characters.length; i++){
      if(characters[i].name === name){
        return characters[i].quotes
      }
      else{
        return initialArray;
      }
    }  */
  } 
};
