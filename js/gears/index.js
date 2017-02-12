"use strict";

const calculateQuotients = require('./calculateQuotients');
const quickFindBuddy = require('./quickFindBuddy');
let itar = 0;

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



    // 2 GEAR PAIR SOLUTION :

    // create map of sorted quotients with "value" instead of "quotient"
    const arrayOfNumbers = sortedQuotients.map(obj => {
        return Object.assign({}, {value : obj.quotient});
    });

    const solution = quickFindBuddy(arrayOfNumbers, sortedQuotients, desiredProduct);

    return solution;




    // // TEST!!!! First, let's start off by finding the solution for 2 pairs of gears :
    //
    // let lastProduct;
    // let solution;
    //
    // // for each of the sorted quotients, find the other quotient, or "buddy" quotient in the sorted list that produces
    // // the product closest to the desired product
    // // eg. as close as we can get to quotient1 * quotient2 = desiredProduct
    // sortedQuotients.forEach((obj, idx) => {
    //
    //     const desiredBuddyQuotient = desiredProduct / obj.quotient;
    //     const distanceFromDesired = (quotient) => Math.abs(desiredBuddyQuotient - quotient);
    //
    //     if (idx === 0) {
    //         obj.buddyIndex = sortedQuotients.length - 1;
    //     } else {
    //         obj.buddyIndex = sortedQuotients[idx - 1].buddyIndex;
    //     }
    //
    //     obj.buddy = sortedQuotients[obj.buddyIndex];
    //
    //     let distanceFromBuddy = distanceFromDesired(obj.buddy.quotient);
    //
    //
    //
    //     findBestBuddy :
    //         for (var i = obj.buddyIndex; i >= 0 - 1; i--) {
    //             itar++;
    //             const currQuotient = sortedQuotients[i].quotient;
    //             const currDistanceFromBuddy = distanceFromDesired(currQuotient);
    //             const gotCloser = currDistanceFromBuddy <= distanceFromBuddy;
    //
    //             if (gotCloser) {
    //                 distanceFromBuddy = currDistanceFromBuddy;
    //                 obj.buddy = sortedQuotients[i];
    //                 obj.buddyIndex = i;
    //             } else {
    //                 break findBestBuddy;
    //             }
    //         }
    //
    //     const currProduct = obj.quotient * obj.buddy.quotient;
    //
    //     if (!lastProduct) {
    //         lastProduct = currProduct;
    //         solution = [obj, obj.buddy];
    //         return;
    //     }
    //
    //     if (Math.abs(desiredProduct - currProduct) < Math.abs(desiredProduct - lastProduct)) {
    //         lastProduct = currProduct;
    //         solution = [obj, obj.buddy];
    //         return;
    //     }
    // });
    //
    // console.log(`found solution with ${itar} iteration`);
    // return solution;
};