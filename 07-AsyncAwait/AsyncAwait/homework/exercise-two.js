'use strict';

var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){return st.toUpperCase()});

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD
};


// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if(problem) problem();
});

async function problemA(){
/* function problemA(){ */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */
  // callback version
 /*  async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
    function (filename, eachDone){
      readFile(filename, function(err, stanza){
        console.log('-- A. callback version --');
        blue(stanza);
        eachDone();
      });
    },
    function(err){
      console.log('-- A. callback version done --');
    }
  ); */

  // AsyncAwait version
    try{
      const stanza1 = promisifiedReadFile('poem-two/stanza-01.txt')
      const stanza2 = promisifiedReadFile('poem-two/stanza-02.txt')
      blue(await stanza1)
      blue(await stanza2)  
    }
    catch{}
    finally{
    console.log('-- F. callback version done --');
    }

/*   try{
    const stanzas = await Promise.all([ // Promise.all devuelve un array de las respuestas
      promisifiedReadFile('poem-two/stanza-01.txt'), 
      promisifiedReadFile('poem-two/stanza-02.txt')])
    blue(...stanzas) // el spread operator porque la respuesta está siendo un array
  }
  catch(err){}
  finally{
    console.log('-- F. callback version done --');
  } */

}

async function problemB(){
/* function problemB () { */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function(n){
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
/*   async.each(filenames,
    function(filename, eachDone){
      readFile(filename, function(err, stanza){
        console.log('-- B. callback version --');
        blue(stanza);
        eachDone();
      });
    },
    function(err){
      console.log('-- B. callback version done --');
    }
  ); */

  // AsyncAwait version
  try{
    const calls = [];
    for(const file of filenames){
      calls.push(promisifiedReadFile(file));
    }
    (await Promise.all(calls)).forEach((stanza) => blue(stanza));
  }
  catch(err){}
  finally{
    console.log('-- F. callback version done --');
  }
}

async function problemC(){
/* function problemC () { */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function(n){
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
/*   async.eachSeries(filenames,
    function(filename, eachDone){
      readFile(filename, function(err, stanza){
        console.log('-- C. callback version --');
        blue(stanza);
        eachDone();
      });
    },
    function(err){
      console.log('-- C. callback version done --');
    }
  ); */

  // AsyncAwait version
  /*   for(let i = 0; i < filenames.length; i++){
      blue(await promisifiedReadFile(filenames[i]));
    }
    console.log('-- C. callback version done --'); */
    // -----------------------------------------------------------
    // Otro método para estar seguros de que se imprime en orden!
/* 
    const readFileAsync = async(filename) => {
      blue(await promisifiedReadFile(filename));
    }

    async function inOrder(){
      for(let i = 0; i < filenames.length; i++){
        await readFileAsync(filenames[i]);
      }
      console.log('-- C. callback version done --')
    }
      inOrder(); */
    // ------------------------------------------------------------
    try{
      for(const file of filenames){
        blue(await promisifiedReadFile(file));
      }
    }
    catch{}
    finally{
    console.log('-- C. callback version done --');
    }
}

async function problemD(){
/* function problemD(){ */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function(n){
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // callback version
/*   async.eachSeries(filenames,
    function(filename, eachDone){
      readFile(filename, function(err, stanza){
        console.log('-- D. callback version --');
        if(err) return eachDone(err);
        blue(stanza);
        eachDone();
      });
    },
    function(err){
      if(err) magenta(err);
      console.log('-- D. callback version done --');
    }
  ); */

  // AsyncAwait version

    try{
      for(const file of filenames){
        let promise = await promisifiedReadFile(file);
        blue(promise);
      }
    }
    catch(err){
      magenta(err);
    }
    finally{
      console.log('-- D. callback version done --');
    }
}
