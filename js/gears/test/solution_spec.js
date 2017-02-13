"use strict";

const timer = require('./timer');
const solve = require('../src/solution');
const calcFinalValue = require('../src/calcFinalValue');


// SOLUTION :
const findSolution = () => {
    let solution = solve({
        desiredNumber: 127,
        requiredFactors : [40],
        numberOfPairs: 3,
        lowerBound: 13,
        upperBound: 50
    });
    console.log(JSON.stringify(solution));
    const arr = solution.reduce((prev, { numerator, denominator }) => {
        return prev.concat([numerator, denominator]);
    }, []);
    console.log('The above solution gives : ');
    console.log(calcFinalValue.apply(null, arr));
};


timer(findSolution);
