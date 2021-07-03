'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
const executor = function(){};
const resolve = function(){};
const reject = function(){};


function $Promise(executor){
    if(typeof executor !== 'function') throw new TypeError('executor is not a function');
    
    this._state = 'pending';
    this._value = undefined;
    this._handlerGroups = [];
    /* bind: cuando executor se ejecuta crea su propio contexto de ejecición y pierde la referencia this */
 // executor(this._internalResolve.bind(this), this._internalReject.bind(this));  
    /* las Arrow function agarran el contexto de donde son ejecutadas (no hace falta bind) */
    executor((data) => this._internalResolve(data), (data) => this._internalReject(data));  

}

$Promise.prototype._internalResolve = function(data){
    if(this._state === 'pending'){
        this._state = 'fulfilled';
        this._value = data;
        this._callHandlers();
    }
};

$Promise.prototype._internalReject = function(data){
    if(this._state === 'pending'){
        this._state = 'rejected';
        this._value = data;
        this._callHandlers();
    }
};

$Promise.prototype.then = function(successCb, errorCb){
    if(typeof successCb !== 'function') successCb = false;
    if(typeof errorCb !== 'function') errorCb = false;

    const downstreamPromise = new $Promise(function(){});

    this._handlerGroups.push({
        successCb,
        errorCb,
        downstreamPromise
    })

    if(this._state !== 'pending') this._callHandlers();
    return downstreamPromise;
};

$Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length){
        let{successCb, errorCb, downstreamPromise} = this._handlerGroups.shift();
        if(this._state === 'fulfilled'){
            if(!successCb){
                // Si pA no tiene un successCb definido
                // pB se resuelve al valor que se resolvió pA 
                return downstreamPromise._internalResolve(this._value);
            }
            try{
                const result = successCb(this._value);
                // Si el resultado es una promesa
                if(result instanceof $Promise){
                    // VERDE - HANDLER -AZUL
                    return result.then(function(value){  
                        // result = promiseZ
                        // value = 'Z'
                    downstreamPromise._internalResolve(value)
                }, function(reason){
                    // Puede ser que la promesaZ tire un error
                    downstreamPromise._internalReject(reason);
                });
              }
                // VERDE - HANDLER - VIOLETA
              downstreamPromise._internalResolve(result);
            }
            catch(err){
                downstreamPromise._internalReject(err);
            }
        } 
      
        if(this._state === 'rejected'){
            //pB = reject(pA.reason)
            if(!errorCb) return downstreamPromise._internalReject(this._value);
            try{
                const result = errorCb(this._value);
                if(result instanceof $Promise){
                    return result.then(function(value){
                        downstreamPromise._internalResolve(value);
                    }, function(reason){
                        downstreamPromise._internalReject(reason);
                    })
                }
                downstreamPromise._internalResolve(result);
            }
            catch(err){
                downstreamPromise._internalReject(err);
            }
        }
    }
};

$Promise.prototype.catch = function(errorCb){
    return this.then(null, errorCb);
}

/* $Promise.prototype.catch = function(successCb, errorCb){
    if(typeof successCb !== 'function') successCb = false;
    if(typeof errorCb !== 'function') errorCb = false;
    this._handlerGroups.push({
        successCb,
        errorCb
    })
    if(this._state !== 'pending') this._callHandlers();
}; */

/* $Promise.prototype.catch = function(errorH){
    return this.then(null, errorH);
} */


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
