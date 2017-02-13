"use strict";

const timer = require('./timer');
const bruteForce = require('../src/bruteForce');


// BRUTE FORCE :
const bruteForceFour = () => {
    const solution = bruteForce.findFour(13, 50);
    console.log(solution); // [ 41, 22, 46, 27 ]
};

const bruteForceSix = () => {
    const solution1 = bruteForce.findSix(13, 50);
    console.log(solution1); // [ 35, 17, 38, 31, 39, 31 ]
};

timer(bruteForceFour);

console.log('WARNING! this is going to take ~30 seconds to complete.');
timer(bruteForceSix);
