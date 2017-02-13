"use strict";

let startingArr;
let desiredSpots = 0;
let currCombo = [];
let combinations;


/**
 * Gets all possible unique combinations of N "spots" from an array where repetition is allowed.
 *
 * USE WITH CAUTION!!! Running this function on large sets of numbers can beat the living s*** out of your machine if
 * you're not careful / running your code on distributed software.
 *
 *      *** be warned that increasing the number of "spots" (eg. choose r) will blow up repetitions much faster than
 *      increasing the number of entries in the array
 */
const getUniques = (array, spots) => {
    if (spots > array.length) {
        throw new Error('Invalid function call to uniqueCombinations. Asked for ' + spots + ' spots from array of ' +
        'length ' + array.length);
    }

    // set the global variables
    startingArr = array;
    desiredSpots = spots;
    combinations = [];

    _buildUniques(0, 0);
    return combinations;
};

const _buildUniques = (lastIndex, spotIndex) => {

    // starting at the last index iterated over, loop up to the length of the starting array.
    for (let index = (lastIndex); index < startingArr.length; index++) {

        // push the current entry in the starting array to the current combo. Use the spotIndex to know which
        // spot in the combination array you are populating.
        currCombo[spotIndex] = startingArr[index];

        // if we are on the bottom level, push the combination to the output combinations array
        if (spotIndex === (desiredSpots - 1)) {

            combinations.push(currCombo.slice()); // use slice to get clone

        } else {

            // if we are not at the bottom of the tree (or the end of the loop) then we need to push another number
            // to the currCombo. Set the lastIndex to the current index before proceeding.
            lastIndex = index;
            _buildUniques(lastIndex, (spotIndex + 1));
        }

    }
};

module.exports = getUniques;