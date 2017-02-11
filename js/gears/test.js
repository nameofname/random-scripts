"use strict";


let calculateQuotients = require('./calculateQuotients');
const arr = calculateQuotients({ lowerBound : 3, upperBound : 10 });
// const arr = calculateQuotients({ lowerBound : 13, upperBound : 50 });
console.log(arr);
