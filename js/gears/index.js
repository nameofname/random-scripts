"use strict";

const calculateQuotients = require('./calculateQuotients');

/**
 * The base formula we are solving for looks like this :
 *
 *      (a/b) * (c/d) ... * requiredFactor = desiredNumber
 *
 * Where increasing the numberOfPairs will result in another fraction being added ot the equation.
 *
 * Example :
 *
 *      solve({ desiredNumber: 127, requiredFactors : [40], numberOfPairs: 3, lowerBound: 13, upperBound: 50 });
 *      (a/b) * (c/d) * (e/f) * 40 = 127 // solves for the equation :
 *
 * The solution will be an array representing the values a - f between 13 - 50
 * which results in the closest number to 127
 *
 * @param desiredNumber
 * @param requiredFactors
 * @param numberOfPairs
 * @param upperBound
 * @param lowerBound
 */
module.exports = ({ desiredNumber, requiredFactors, numberOfPairs, upperBound, lowerBound }) => {
    const quotients = calculateQuotients({ upperBound, lowerBound });
    let requiredFactor;
    requiredFactor = requiredFactors.reduce((prev, val) => (prev * val), 1);
    const desiredProduct = desiredNumber / requiredFactor;



    // TEST!!!! First, let's start off by finding the solution for 2 pairs of gears :
    quotients.forEach(obj => {
        const q = obj.quotient;
        const desiredBuddy = desiredProduct / q;
        let distanceFromBuddy;

        findBuddy:
        for (var i = 0; i <= quotients.length; i++) {


            break findBuddy;
        }
    });

};