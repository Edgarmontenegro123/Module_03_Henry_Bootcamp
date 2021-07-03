const {doesNotMatch} = require('assert')
const fs = require('fs')
const request = require('request')


module.exports = {
    date: function(args, done){
        /* process.stdout.write(Date()); */
        done(Date());
    },

    pwd: function(args, done){
        /* process.stdout.write(process.env.PWD); */
        done(process.env.PWD);
    },

    ls: function(args, done){
       /*  fs.readdir('.', function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
              process.stdout.write(file.toString() + "\n");
            })
            process.stdout.write("Escribe acá:> ");
        }); */
        fs.readdir('.', function(err, files){
            if (err) throw err;
            let output = '';
            files.forEach(function(file){
                /* output = output + file.toString() + '\n'; */
                output = `${output} ${file.toString()}\n`;
            });
            done(output);
        })
    },

    echo: function(args, done){
        /* process.stdout.write(args.join(' ')); */
        done(args.join(' '));
    },

    cat: function(args, done){
       /*  fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            process.stdout.write(data);
            process.stdout.write("Escribe acá:> ");
        }); */
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
           done(data);
        });
    },

    head: function(args, done){
       /*  fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            var lines = data.split('\n').splice(0, 10).join('\n');
            process.stdout.write(lines);
            process.stdout.write("Escribe acá:> ");
        }); */
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            var lines = data.split('\n').splice(0, 10).join('\n');
            done(lines);
        });
    },

    tail: function(args, done){
       /*  fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            var lines = data.split('\n');
            var lastLines= lines.splice(lines.length - 10).join('\n');
            process.stdout.write(lastLines);
            process.stdout.write("Escribe acá:> ");
        }); */
        fs.readFile(args[0], 'utf8', function(err, data){
            if(err) throw err;
            var lines = data.split('\n');
            var lastLines= lines.splice(lines.length - 10).join('\n');
            done(lastLines);
        });
    },

    curl: function(args, done){
       /*  request(args[0], function(err, response,body){
            if(err) throw err;
            process.stdout.write(body);
            process.stdout.write("Escribe acá:> ");
        }) */
        request(args[0], function(err, response,body){
            if(err) throw err;
            done(body);
        })
    }
}


