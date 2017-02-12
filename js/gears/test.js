"use strict";


let calculateQuotients = require('./calculateQuotients');
let solve = require('./index');
let bruteForce = require('./bruteForce');


// SOLUTION :
let solution = solve({ desiredNumber: 127, requiredFactors : [40], numberOfPairs: 2, lowerBound: 13, upperBound: 50 });
console.log(solution);


// BRUTE FORCE :
// const solution = bruteForce.findFour(13, 50);
// console.log(solution);
//
// const solution1 = bruteForce.findSix(13, 50);
// console.log(solution1);

