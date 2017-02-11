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
    const sortedQuotients = calculateQuotients({ upperBound, lowerBound });
    let requiredFactor;
    requiredFactor = requiredFactors.reduce((prev, val) => (prev * val), 1);
    const desiredProduct = desiredNumber / requiredFactor;



    // TEST!!!! First, let's start off by finding the solution for 2 pairs of gears :

    let product;
    let solution;

    sortedQuotients.forEach(obj => {
        const desiredBuddy = desiredProduct / obj.quotient;
        const findDistance = (quotient) => Math.abs(desiredBuddy - quotient);
        let buddy = sortedQuotients[0];
        let distanceFromBuddy = findDistance(buddy.quotient);

        findBuddy:
        for (var i = 1; i <= sortedQuotients.length; i++) {

            const curr = sortedQuotients[i].quotient;
            const distance = findDistance(curr);
            const gotCloser = distance < distanceFromBuddy;

            if (gotCloser) {
                distanceFromBuddy = distance;
                buddy = sortedQuotients[i];
            } else {
                break findBuddy;
            }
        }

        const currProduct = obj.quotient * buddy.quotient;

        if (!product) {
            product = currProduct;
            solution = [obj, buddy];
            return;
        }

        if (Math.abs(desiredProduct - currProduct) < Math.abs(desiredProduct - product)) {
            product = currProduct;
            solution = [obj, buddy];
            return;
        }
    });


    return solution;
};