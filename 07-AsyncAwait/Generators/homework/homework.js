function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let i = 1;
  
  // En while pregunto si existe un max, si es así i debe ser menor que max y si no existe se hace infinitamente
  while(max ? i <= max : true){
    let result;
    if(i % 5 === 0 && i % 3 === 0){
      result = 'Fizz Buzz';
    }
    else if(i % 5 === 0){
      result = 'Buzz';
    }
    else if(i % 3 === 0){
      result = 'Fizz';
    }
    else{
      result = i;
    }
    i++;
  yield result
  }
}

module.exports = fizzBuzzGenerator;
