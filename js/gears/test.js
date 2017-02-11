"use strict";


// let calculateQuotients = require('./calculateQuotients');
// const arr = calculateQuotients({ lowerBound : 3, upperBound : 10 });
// const arr = calculateQuotients({ lowerBound : 13, upperBound : 50 });


let solve = require('./index')
let solution = solve({ desiredNumber: 127, requiredFactors : [40], numberOfPairs: 2, lowerBound: 13, upperBound: 50 });

console.log(solution);
