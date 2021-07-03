const {json} = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
/* server.use(bodyParser.json()); */
server.use(express.json());

// TODO: your code to handle requests

server.post('/posts', (req, res) => {
    // Esta línea la puedo utilizar para probar que está funcionando en Postman!!
    /* res.send('Entré al Post de posts!') */
    // en post me llega información que quiero agregar al array en body
   const {title, contents} = req.body;

   let nextId = 1; 

/*     if(!title || !contents){
       res.status(STATUS_USER_ERROR);
       res.json({error: 'No se recibio informacion'});
       return; 
   } */
   if(!title){
       res.status(STATUS_USER_ERROR);
       res.json({error: 'No se recibio titulo'});
       return; 
   }
   if(!contents){
       res.status(STATUS_USER_ERROR);
       res.json({error: 'No se recibio contenido'});
       return; 
    }
    let newPost = {
        title: title,
        contents: contents,
        id: nextId
    };
    nextId++;
    posts.push(newPost);
    res.json(newPost)
});

server.get('/posts', (req, res) => {
    const term = req.query.term;

    if(!term){
        res.json(posts);
        return;
    }
    else{
        const filtrar = posts.filter((post) => {
            return (post.title.indexOf(term) !== -1) ||
                   (post.contents.indexOf(term) !== -1);
            /* return (post.title.includes(term)) ||
            (post.contents.includes(term)); */
        });
        res.json(filtrar);
    }
})

// server.put('/posts', (req, res) => {
//     const {title, contents, id} = req.body;

//    /*  const id = req.body.id;
//     const title = req.body.title;
//     const contents = req.body.contents; */

//     if(!title || !contents || !id){
//         res.status(STATUS_USER_ERROR);
//         res.json({error: 'No se recibieron los parametros necesarios para crear el Post'});
//         return;
//     }
//     // valido el id
//     const post = posts.find(p => p.id === id);
//     if(!post){
//         res.status(STATUS_USER_ERROR);
//         res.json({error: 'No se encontro el id'});
//         return;
//     }
//     post.title = title;
//     post.contents = contents;
//     res.json(post);
// });
server.put("/posts", function(req, res){
    const{id, title, contents} = req.body;
    if(!id || !title || !contents){
      res.status(STATUS_USER_ERROR);
      return res.json({
        error:
          "No se recibieron los parámetros necesarios para modificar el Post",
      });
    }
    const post = posts.find((p) => p.id === id);
    if(!post){
      res.status(STATUS_USER_ERROR);
      return res.json({ error: "No se encontro el Post con ese ID" });
    }
    post.title = title;
    post.contents = contents;
    res.json(post);
  });
  
  server.delete("/posts", function(req, res){
    const id = req.body.id;
    if(!id){
      res.status(STATUS_USER_ERROR);
      return res.json({ error: "No se recibio ningun id" });
    }
    const post = posts.find((p) => p.id === id);
    if(!post){
      res.status(STATUS_USER_ERROR);
      return res.json({ error: "No se encontro el Post con ese ID" });
    }
    posts = posts.filter((p) => p.id !== id);
    res.json({ success: true });
  });

server.delete('/posts', (req, res) => {
    const id = req.body.id;
    if(!id){
        res.status(STATUS_USER_ERROR);
        res.json({error: 'No se envio el id'});
        return;
    }
    const post = posts.find(p => p.id === id);

    if(!post){
        res.status(STATUS_USER_ERROR);
        res.json({error: 'No existe el post con ese id'})
        return;
    }
    posts = posts.filter(p => p.id !== id);
    res.json({success: true})
}) 


module.exports = {posts, server};
