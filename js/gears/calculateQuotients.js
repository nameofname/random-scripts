"use strict";

const arraySortPush = require('./arraySortPush');

/**
 * Takes in a range with an lower and upper bound and returns a sorted list of quotients (Map) with some metadata
 * about each quotient
 *
 * @param lowerBound
 * @param upperBound
 * @returns {Array}
 */
module.exports = (lowerBound, upperBound) => {
    const arr = [];

    for (let i = lowerBound; i <= upperBound; i++) {
        for (let j = lowerBound; j <= upperBound; j++) {
            const quotient = i / j;
            const obj = {quotient, numerator: i, denominator: j};
            arraySortPush(obj, 'quotient', arr);
        }
    }

    return arr;
};