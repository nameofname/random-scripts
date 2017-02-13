"use strict";


let calculateQuotients = require('./calculateQuotients');
let solve = require('./index');
let bruteForce = require('./bruteForce');
let calcFinalValue = require('./calcFinalValue');


// testing out calculate quotients :
// const quotients = calculateQuotients(13, 50);
// console.log(quotients.length);


// SOLUTION :
let solution = solve({
    desiredNumber: 127,
    requiredFactors : [40],
    numberOfPairs: 2,
    lowerBound: 13,
    upperBound: 50
});
console.log(JSON.stringify(solution));
const arr = solution.reduce((prev, { numerator, denominator }) => {
    return prev.concat([numerator, denominator]);
}, []);
console.log('The above solution gives : ');
console.log(calcFinalValue.apply(null, arr));

// BRUTE FORCE :
// const solution = bruteForce.findFour(13, 50);
// console.log(solution);
//
// const solution1 = bruteForce.findSix(13, 50);
// console.log(solution1);

