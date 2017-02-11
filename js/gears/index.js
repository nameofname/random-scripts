"use strict";


/**
 * The base formula we are solving for looks like this :
 *
 *      (a/b) * (c/d) ... * requiredFactor = desiredProduct
 *
 * Where increasing the numberOfPairs will result in another fraction being added ot the equation.
 *
 * Example :
 *
 *      solve(127, [40], 3);
 *      (a/b) * (c/d) * (e/f) * 40 = 127 // solves for the equation :
 *
 * The solution will be an array representing the values of a - f which results in the closest number to 127
 *
 * @param desiredProduct
 * @param requiredFactors
 * @param numberOfPairs
 */
module.exports = (desiredProduct, requiredFactors, numberOfPairs) => {
    //
};