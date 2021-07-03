const { expect } = require('chai');
const session = require('supertest-session');
const functions = require('../functions.js');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
const {sumArray, pluck} = require('../functions.js');
const { describe } = require('mocha');

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).to.be.equal('hola')}));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).to.be.equal('test')}));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).to.be.equal(5)}));
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).to.be.equal(6)}));
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [], n: 1}).expect(200));
    it('responds true if the sum of two numbers is equal to n', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).to.be.equal(true)})); // Porque en true No funciona???
    it('responds false if the sum of two numbers is not equal to n', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 99})
        .then((res) => {
          expect(res.body.result).to.be.equal(false)}));
});

  // Armo otro test para probar las funciones fuera de los EndPoints
  describe('function sumArray', () => {
    it('return true when two numbers in the array sum n', () => {
      expect(sumArray([1, 2, 3, 4, 5], 9)).to.be.equal(true);
    });
    it('return false when the sum of two numbers in the array isn`t n', () => {
      expect(sumArray([1, 2, 3, 4, 5], 12)).to.be.equal(false);
    });
    it('return false when the sum of two different numbers in the array isn`t n', () => {
      expect(sumArray([4, 7, 9, 10, 5], 3)).to.be.equal(false);
    });
  });

  describe('GET /numString', () => {
    it('responds with 200', () => agent.get('/numString?s=franco').expect(200));
    it('responds with 404 when string is a number', () => agent.get('/numString?s=9').expect(404));
    it('responds with 404 when string is empty', () => agent.get('/numString').expect(404));
    it('responds with 7 when string is viviana', () => agent.get('/numString?s=viviana')
      .then(res => {
        expect(res.body.result).to.be.equal(7)}));
    it('responds with 4 when string is hola', () => agent.get('/numString?s=hola')
      .then(res => {
        expect(res.body.result).to.be.equal(4)}));
  })
});

describe('function pluck', () => {
  const product = [{name: 'lcd', price: 300}, {name: 'notebook', price: 900}]
  it('responds with ["lcd", "notebooh"]', () => {
    expect(pluck(product, 'name')).to.deep.equal(["lcd", "notebook"]);
  })
  it('responds with [300, 900]', () => {
    expect(pluck(product, 'price')).to.deep.equal([300, 900]);
  })
})

describe('POST /pluck', () => {
  const product = [{name: 'lcd', price: 300}, {name: 'notebook', price: 900}]
  it('responds with 200', () => 
    agent.post('/pluck')
      .send({array: [], prop: '...'})
      .expect(200)
    );
    it('responds with 400 when array is not an array', () => 
    agent.post('/pluck')
      .send({array: 123, prop: '...'})
      .expect(400)
    );
    it('responds with 400 when prop is empty', () => 
    agent.post('/pluck')
      .send({array: [], prop: ''})
      .expect(400)
    );
    it('responds with 400 when prop is not present', () => 
    agent.post('/pluck')
      .send({array: []})
      .expect(400)
    );
    it('responds with ["lcd", "notebooh"]', () => 
    agent.post('/pluck')
      .send({array: product, prop: 'name'})
      .then((res) => {
        expect(res.body.result).to.deep.equal(["lcd", "notebook"]);
      })   
    );
})

