var http = require('http');
var fs   = require('fs');

var beatles=[{
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
  }
]

const readFile = function(file){
  return new Promise(function(resolve, reject){
    fs.readFile(file, 'utf-8', function(err, data){
      if(err) return reject(err)
      resolve(data);
    });
  });
}

const home = readFile('./index.html');
const profile = readFile('./beatle.html');

http.createServer(function(req, res){
  if(req.url === '/api'){
    res.writeHead(200, {'Content-Type': 'application.json'});
    res.end(JSON.stringify(beatles));
  }
  if(req.url.substring(0,5) === '/api/' && req.url.length > 5){
    const beatle = req.url.split('/').pop();
    const response = beatles.filter(function(b){
      return encodeURI(b.name) === beatle;
    })[0];
    if(!response){
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Ese no es un Beatle!');
      return;
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
  }
  if(req.url === '/'){
      home.then(function(html){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);
    })
  }
  if(req.url[0] === '/' && req.url.length > 2){
    const beatle = req.url.split('/').pop();
    const response = beatles.filter(function(b){
      return encodeURI(b.name) === beatle;
    })[0];
    if(!response){
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Ese no es un Beatle!');
      return;
    }
      profile.then(function(html){
        html = html.replace('{name}', response.name)
                  .replace('{birthdate}', response.birthdate)
                  .replace('{profilePic}', response.profilePic);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);
    });
  }
}).listen(1333, '127.0.0.1');