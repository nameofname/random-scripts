"use strict";

const calculateQuotients = require('./calculateQuotients');
const quickFindBuddy = require('./quickFindBuddy');
const buildUniquePairs = require('./buildUniquePairs');

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

/**
 * The four gear solution produces an answer with 4 numbers to fit the pattern :
 * (a / b) * (c / d) * C = A;
 *
 * Return value should be formatted as an array of objects, each with a numerator and denominator
 *
 * @param sortedQuotients
 * @param desiredProduct
 */
const fourGearSolution = (sortedQuotients, desiredProduct) => {

    const arrayOfNumbers = sortedQuotients.map(({ quotient, numerator, denominator}) => {
        return Object.assign({}, {
            value : quotient,
            numerator, denominator
        });
    });

    const buddys = quickFindBuddy(arrayOfNumbers, sortedQuotients, desiredProduct);
    return [buddys, buddys.buddy]
        .map(({ numerator, denominator }) => ({ numerator, denominator }));
};


/**
 * The six gear solution produces an answer with 6 numbers to fit the pattern :
 * (a / b) * (c / d) * (e / f) * C = A;
 *
 * Return value should be formatted as an array of objects, each with a numerator and denominator
 *
 * @param sortedQuotients
 * @param desiredProduct
 */
const sixGearSolution = (sortedQuotients, desiredProduct) => {

    const list = buildUniquePairs(sortedQuotients);

    const buddys = quickFindBuddy(list, sortedQuotients, desiredProduct);
    return [buddys.buddy, buddys.factors[0], buddys.factors[1]]
        .map(({ numerator, denominator }) => ({ numerator, denominator }));
};
