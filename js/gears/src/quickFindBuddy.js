"use strict";


/**
 * Takes in 2 sorted lists and finds the matching pair from each list which produces the closest match to the deired
 * product. Both lists must be sorted or the return value will be incorrect.
 *
 * @param arrayOfNumbers - sorted array of objects, each object must have a 'value' property to match against
 * @param sortedQuotients - sorted array of quotient objects, each one must have a 'quotient' property to match
 * @param desiredProduct
 * @returns {*}
 */
module.exports = (arrayOfNumbers, sortedQuotients, desiredProduct) => {
    let lastProduct;
    let solution;

    // for each of the sorted quotients, find the other quotient, or "buddy" quotient in the sorted list that produces
    // the product closest to the desired product
    // eg. as close as we can get to quotient1 * quotient2 = desiredProduct
    arrayOfNumbers.forEach((obj, idx) => {

        const desiredBuddyQuotient = desiredProduct / obj.value;
        const distanceFromDesired = (quotient) => Math.abs(desiredBuddyQuotient - quotient);

        if (idx === 0) {
            obj.buddyIndex = sortedQuotients.length - 1;
        } else {
            obj.buddyIndex = arrayOfNumbers[idx - 1].buddyIndex;
        }

        obj.buddy = sortedQuotients[obj.buddyIndex];

        let distanceFromBuddy = distanceFromDesired(obj.buddy.quotient);

        findBestBuddy :
            for (var i = obj.buddyIndex; i >= 0; i--) {
                const currQuotient = sortedQuotients[i].quotient;
                const currDistanceFromBuddy = distanceFromDesired(currQuotient);
                const gotCloser = currDistanceFromBuddy <= distanceFromBuddy;

                if (gotCloser) {
                    distanceFromBuddy = currDistanceFromBuddy;
                    obj.buddy = sortedQuotients[i];
                    obj.buddyIndex = i;
                } else {
                    break findBestBuddy;
                }
            }

        const currProduct = obj.value * obj.buddy.quotient;

        if (!lastProduct) {
            lastProduct = currProduct;
            solution = obj;
            return;
        }

        if (Math.abs(desiredProduct - currProduct) < Math.abs(desiredProduct - lastProduct)) {
            lastProduct = currProduct;
            solution = obj;
            return;
        }
    });

    return solution;
};
