"use strict";

const calculateQuotients = require('./calculateQuotients');
const quickFindBuddy = require('./quickFindBuddy');
const combinationsRepeatAllowed = require('./combinationsRepeatAllowed');

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
    const sortedQuotients = calculateQuotients(lowerBound, upperBound);
    let requiredFactor;
    requiredFactor = requiredFactors.reduce((prev, val) => (prev * val), 1);
    const desiredProduct = desiredNumber / requiredFactor;


    if (numberOfPairs === 2) {
        return fourGearSolution(sortedQuotients, desiredProduct);
    } else if (numberOfPairs === 3) {
        return sixGearSolution(sortedQuotients, desiredProduct);
    } else {
        throw new Error('Any more than 3 pairs of gears will cause this function to crash your machine dumb ass.');
    }
};

const fourGearSolution = (sortedQuotients, desiredProduct) => {
    // create map of sorted quotients with "value" instead of "quotient"
    const arrayOfNumbers = sortedQuotients.map(({ quotient, numerator, denominator}) => {
        return Object.assign({}, {
            value : quotient,
            numerator, denominator
        });
    });

    return quickFindBuddy(arrayOfNumbers, sortedQuotients, desiredProduct);
};

const sixGearSolution = (sortedQuotients, desiredProduct) => {

    const list = combinationsRepeatAllowed(sortedQuotients, 2);

    return quickFindBuddy(list, sortedQuotients, desiredProduct);
};