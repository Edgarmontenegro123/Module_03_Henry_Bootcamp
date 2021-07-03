const commands = require('./commands');

const done = function(output){
  process.stdout.write(output);
  process.stdout.write('\nEscribe acá:')
}


process.stdout.write('Escribe acá:> ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' '); // remueve la nueva línea
  var cmd = args.shift();
 /*  if(cmd === 'date') {
    process.stdout.write(Date());  
  }
  if(cmd === 'pwd') {
    process.stdout.write(process.env.PWD);
  } */
  commands[cmd](args, done);
  /* process.stdout.write('\nEscribe acá:> '); */
});