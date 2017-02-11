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

    let lastProduct;
    let solution;

    // for each of the sorted quotients, find the other quotient, or "buddy" quotient in the sorted list that produces
    // the product closest to the desired product
    // eg. as close as we can get to quotient1 * quotient2 = desiredProduct
    sortedQuotients.forEach(obj => {

        const desiredBuddyQuotient = desiredProduct / obj.quotient;
        const findDistanceFromDesiredBuddy = (quotient) => Math.abs(desiredBuddyQuotient - quotient);
        let buddy = sortedQuotients[0];
        let distanceFromBuddy = findDistanceFromDesiredBuddy(buddy.quotient);


        findBuddy:
        for (var i = 1; i <= sortedQuotients.length - 1; i++) {
            const currQuotient = sortedQuotients[i].quotient;
            const currDistanceFromBuddy = findDistanceFromDesiredBuddy(currQuotient);
            const gotCloser = currDistanceFromBuddy <= distanceFromBuddy;

            if (gotCloser) {
                distanceFromBuddy = currDistanceFromBuddy;
                buddy = sortedQuotients[i];
            } else {
                break findBuddy;
            }
        }

        const currProduct = obj.quotient * buddy.quotient;

        if (!lastProduct) {
            lastProduct = currProduct;
            solution = [obj, buddy];
            return;
        }

        console.log(`desiredProduct: ${desiredProduct} currProduct: ${currProduct} lastProduct: ${lastProduct}`)
        if (Math.abs(desiredProduct - currProduct) < Math.abs(desiredProduct - lastProduct)) {
            lastProduct = currProduct;
            solution = [obj, buddy];
            return;
        }
    });


    return solution;
};