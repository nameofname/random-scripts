"use strict";

let usedProducts;

/**
 * Build a list of unique
 * @param sortedQuotients
 * @returns {Array}
 */
module.exports = (sortedQuotients) => {
    let pairs = [];
    usedProducts = new Map();

    for (let i=0; i < sortedQuotients.length; i++) {
        for (let j=i; j < sortedQuotients.length; j++) {
            const one = sortedQuotients[i];
            const two = sortedQuotients[j];
            const obj = {
                value: one.quotient * two.quotient,
                factors: [one, two]
            };
            // de-dupe products
            if (!usedProducts.get(obj.value)) {
                pairs.push(obj);
                usedProducts.get(obj.value, true);
            }
        }
    }

    return pairs;
};