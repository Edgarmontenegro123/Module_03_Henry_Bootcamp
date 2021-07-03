var fs  = require("fs")
var http  = require("http")


const archivos = new Promise(function(resolve, reject){
    fs.readdir('images', function(err, files){
        if(err) return reject(err);
        resolve(files);
    })
})

const readImage = function(file){
    return new Promise(function(resolve, reject){
        fs.readFile(file, function(err, data){
            if(err) return reject(err);
            resolve(data);
        })
    })
}

// Escribí acá tu servidor
http.createServer(function(req, res){
    /* Manera más erronea ya que se repetiría mucho código */  
  /*   if(req.url === '/arcoiris_doge.jpg'){
        fs.readFile('./images/arcoiris_doge.jpg', function(err, data){
            if(err){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('No se encontró la imagen');
            }else{
                res.writeHead(200, {'Content-Type': 'image/jpg'});
                res.end(data);
            }
        })
    } */

    /* Hecho con Promises */
    archivos.then(function(files){
        const imagen = req.url.split('/').pop();
        const index = files.indexOf(imagen);
        if(index >= 0){
            return readImage(`./images/${files[index]}`)
        }
        else{
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('<h1>404 Doge Not Found</h1>')
        }
    }).then(function(result){
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(result);
    })

    /* Otra forma sin utilizar Promises */
    // http
    // .createServer(function(req, res){
    //     fs.readFile(_dirname + '/images' + req.url, function(err, data){
    //         if(err){
    //             res.writeHead(404, {'Content-Type': 'text-html'});
    //             return res.end('<h1>404 Doge Not Found</h1>');
    //         }
    //         res.writeHead(200, {'Content-Type': 'image/jpeg'});
    //         res.end(data)
    //     });
    // });

}).listen(1337, '127.0.0.1');