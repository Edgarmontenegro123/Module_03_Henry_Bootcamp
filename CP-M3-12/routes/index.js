'use strict';

var express = require('express');
const {get} = require('../app');
var router = express.Router();
const {listFamilies, addFamily, listCharacter, addCharacter, showQuotes, addQuote} = require('../models/model.js')
module.exports = router;

// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan

router.get('/families', (req, res) => {
    res.json(listFamilies());
})

router.post('/families', (req, res) => {
    const {family} = req.body;
    addFamily(family);
    res.json(family);
})

router.get('/characters', (req, res) => {
    res.send(listCharacter())
})

router.post('/characters', (req, res) => {
   
    const {name, age, family} = req.body;
    let character = addCharacter(name, age, family)

    if(!character){
        res.status(400).send({msg: 'La familia ingresada no existe'})
    }
    else res.json(character); 
  
    /* return !character ? res.status(400).send({msg: 'La familia ingresada no existe'}) : res.json(character) */
});

    router.get('/characters/:name', (req, res) => {
        const {name} = req.params;
        const characters = listCharacter(name);
        const {pluck} = req.query;

        if(!characters){
            return res.json([])
        }
        else{
            if(pluck){
                res.json(listCharacter(name, pluck))
            }
            else{
                res.json(characters); 
            }
        }      
     })

    router.get('/quotes', (req, res) => {
        let{name} = req.body;
        res.json(showQuotes(name));
    });

    router.post('/quotes', (req, res) => {
        const {name, quote} = req.body;
        console.log('accaaaaa', quote)
        addQuote(name, {text: quote})
        res.json({msg: "Frase agregada correctamente"})
    })