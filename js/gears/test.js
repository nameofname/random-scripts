"use strict";


const calculateQuotients = require('./calculateQuotients');
const solve = require('./index');
const bruteForce = require('./bruteForce');
const calcFinalValue = require('./calcFinalValue');
const timer = require('./timer');


// testing out calculate quotients :
// const quotients = calculateQuotients(13, 50);
// console.log(quotients.length);


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

const time = timer(findSolution);
console.log(`finished solution in time of ${time}`);



// BRUTE FORCE :
// const solution = bruteForce.findFour(13, 50);
// console.log(solution);
//
// const solution1 = bruteForce.findSix(13, 50);
// console.log(solution1);

