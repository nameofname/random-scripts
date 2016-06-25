"use strict";

// Sample ranks array would look like :
// var ranks = [ { name : 'one', distance : 1}, { name : 'two', distance : 2}, ...  ]

/**
 * Executes a single element bubble sort over a ranks array.
 * @param ranks
 */
const singleSort = ranks => {
    const top = ranks[0];
    let idx = 1;

    while(top.distance > (ranks[idx]&& ranks[idx].distance)) {
        ranks[idx - 1] = ranks[idx];
        ranks[idx] = top;
        idx++;
    }
};

module.exports = singleSort;
