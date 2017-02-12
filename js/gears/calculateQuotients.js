"use strict";


const addToArr = (quotient, numerator, denominator, arr) => {
    const obj = { quotient, numerator, denominator };

    // if 1st entry, simply push to the array and return
    if (arr.length === 0) {
        arr.push(obj);
        return arr;
    }

    // if 2nd entry, figure out if it's greater or less than and either push or shift
    if (arr.length === 1) {
        return quotient >= arr[0].quotient ? arr.push(obj) : arr.unshift(obj);
        return arr;
    }

    setLoop :
    for (let i = 0; i <= arr.length; i++) {

        if (i === arr.length) {
            // found that the new quotient is the highest, push it to the end of the list
            arr.push(obj);
            break setLoop;
        }

        const curr = arr[i].quotient;
        const prev = arr[i - 1] ? arr[i - 1].quotient : 0;

        // found the position at which the new quotient is between other quotients in the list.
        if ((prev <= quotient) && (quotient <= curr)) {
            // OPTIMIZATION : Only splice it into it's position if it is a new unique quotient.
            if ((obj.quotient !== curr) && (obj.quotient !== prev)) {
                arr.splice(i, 0, obj);
            }
            break setLoop;
        }
    }

    return arr;
};


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
            // OPTIMIZATION : don't ever add a quotient of 1, it's pointless
            if (quotient !== 1) {
                addToArr(quotient, i, j, arr);
            }
        }
    }

    return arr;
};