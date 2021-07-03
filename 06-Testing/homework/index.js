const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {sumArray, pluck} = require('./functions.js');
const {expect} = require('chai');
app.use(bodyParser.json()); // for parsing application/json
/* app.use(express.json()); */

/* let a = req.body.a;
let b = req.body.b; */

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a + req.body.b
  })
})

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b
  });
});

app.post('/sumArray', (req, res) => {
  res.send({
    result: sumArray(req.body.array, req.body.n)
  })
});

app.get('/numString', (req, res) => {
  const string = req.query.s;
  if(!string || !isNaN(parseInt(string))){
    return res.sendStatus(404);
  }
  res.send({
    result: string.length
  })
})

app.post('/pluck', (req, res) => {
  const array = req.body.array;
  const prop = req.body.prop;

  if(!Array.isArray(array) || !prop){
    return res.sendStatus(400);
  }
  res.send({
    result: pluck(array, prop)
  })
})

app.listen(3000);

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
