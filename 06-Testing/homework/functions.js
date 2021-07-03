function sumArray(array, n){
    /* if(!Array.isArray(array)) throw new TypeError('array'); */
    /* if(typeof n !== 'number') throw new TypeError('Second argument must be a number'); */
    for(let i = 0; i < array.length; i++){
        for(let j = i + 1; j < array.length; j++){
            if(array[i] + array[j] === n) return true;
        }
    }
        return false;
}

function pluck(array, prop){
    return array.map(e => e[prop]);
}

module.exports = {
    sumArray: sumArray,
    pluck: pluck
}