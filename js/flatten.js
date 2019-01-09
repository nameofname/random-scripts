const nestedArray = [[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]];
const timer = require('./timer');

function flattenTernaryConcat(array) {
    return !Array.isArray(array)
        ? array
        : array.reduce((concatted, curr) => concatted.concat(flattenTernaryConcat(curr)), []);
}

function flattenConcat(array) {
    if (!Array.isArray(array)) return array;
    return array.reduce((concatted, curr) => concatted.concat(flattenConcat(curr)), []);
}

function flattenClosure(array, type) {
    const out = [];
    function _step(arr) {
        if (Array.isArray(arr)) {
            return arr.forEach(_step);
        }
        out.push(arr);        
    }
    _step(array);
    return out;
}

function flatten(array, flattened = []) {
    if (Array.isArray(array)) {
        array.forEach(thing => flatten(thing, flattened));
        return flattened;
    }
    flattened.push(array);
    return flattened;
}

console.log('flattenTernaryConcat :', flattenTernaryConcat(nestedArray));
console.log('flattenConcat :', flattenConcat(nestedArray));
console.log('flattenClosure :', flattenClosure(nestedArray));
console.log('flatten :', flatten(nestedArray));

// now I don't think concat() is very fast, so I'm going to benchmark these suckers :

function time(callback) {
    return timer(() => {
        for (let i = 0; i <= 100000; i++) {
            callback();
        }
    });
}

console.log('time 1', time(() => flattenTernaryConcat(nestedArray))); // slow
console.log('time 2', time(() => flattenConcat(nestedArray))); // slow
console.log('time 3', time(() => flattenClosure(nestedArray))); // fastest! 
console.log('time 4', time(() => flatten(nestedArray))); // still pretty fast.

// JUST AS I SUSPECTED! ... Concat significantly hurts the performance of the function.