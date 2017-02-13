"use strict";


/**
 * This is an improved version of bubble sort - for each number we bubble it up the list, however, we start from
 * an empty list so the worst case scenario is O(∑(n)) not O(n^n)
 *      - am I writing that correctly? I'm trying to denote it's the summation of 1 ... n
 *
 * @param arr <Array> - the array to sort
 * @param getValue <Function> - a function that returns the value to sort by. It receives the current value in the array
 *      as it's only argument.
 *
 * USAGE :
 *      sort(dataArray, obj => obj.number);
 * @returns {Array}
 */
const sort = (arr, getValue) => {
    const sorted = [];
    arr.forEach(thing => {
        const value = getValue(thing);
        let placed = false;
        innerLoop:
            for (let i = 0; i < sorted.length; i++) {
                const thing1 = sorted[i];
                const value1 = getValue(thing1);
                if (value >= value1) {
                    sorted.splice(i, 0, thing);
                    break innerLoop;
                }
            }
        if (!placed) {
            sorted.push(thing);
        }
    });
    return sorted;
};

module.exports = sort;
