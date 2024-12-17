const timer = require('./helpers/timer');

/**
 * Wraps your function in a function in a function...
 * recursively until depth is reached.
 */
function recurFunctionWrapper(func, depth, currDepth = 0) {
    if (currDepth <= depth) {
        return recurFunctionWrapper(function() {
            // console.log('currDepth', currDepth);
            return func();
        }, depth, ++currDepth);
    }
    return func
}

const myFunc = function() {
    console.log('hello');
}
const myFuncDeep = recurFunctionWrapper(myFunc, 5000);

// This test shows that the execution of functions takes basically 0 time 
// in Node.js. See the following sample outpup: 
/**
nameof ~/projects/random-scripts/js (master) # node many-functions.js
hello
hello
res1 4
res2 0
*/
// if I comment in the console.log statement, it takes longer.

const res1 = timer(myFunc);
const res2 = timer(myFuncDeep);
console.log('res1', res1);
console.log('res2', res2);