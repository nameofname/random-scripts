"use strict";

const solve = require('./index');
const calcFinalValue = require('./src/calcFinalValue');


console.log('4 gear solution : ');

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



console.log('6 gear solution : ');

let solution1 = solve({
    desiredNumber: 127,
    requiredFactors : [40],
    numberOfPairs: 3,
    lowerBound: 13,
    upperBound: 50
});

console.log(JSON.stringify(solution1));

const arr1 = solution.reduce((prev, { numerator, denominator }) => {
    return prev.concat([numerator, denominator]);
}, []);

console.log('The above solution gives : ');
console.log(calcFinalValue.apply(null, arr1));
