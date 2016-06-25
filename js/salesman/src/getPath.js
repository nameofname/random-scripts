"use strict";

const each = require('./each');
let theLib;

/**
 * Possible approaches :
 * 1. loop through in rounds. For each round, you try to pick the next one in your rank. IF that one already has you
 * as it's next, then you have to go down one. You win the bid if your pick's rank is higher than it's current "previous"
 * partner's rank for that pick.
 * 2. Do the same approach with rounds, but for each item in each round, you do an inner while loop going down your
 * ranks to get the highest option available ... and I'm not sure why I would do this, because I am afraid that you would
 * run out of options in your ranks, but you could do some bidding logic here to figure out the best combination, more
 * based on the distance between rather than the ranks.
 *
 * However, I am leaning away from approach #2 because I think the higher rank is more important than the distance
 * because even points that are far away from all the other points need a partner.
 *
 * The complexity for either is N^2, but I think the while loop solution could result in a few more loops here and there...
 */


//const propose = (point1, point2) => {
//    const distance = point2.distance;
//    const point2CurrState = theLib[point2.name];
//    const competitor = (point2CurrState.next);
//
//    // TODO ::: here make sure that the next object has the correct distance between - you want it to be the distance
//    // between point 1 and 2, so you must reference the correct distance (which should be from poin2)
//    // TODO!!!!!!!!!!!!! this is not right at all....
//    if (point2.next === undefined) {
//        point2.next = point1;
//
//    } else {
//        if (distance < competitor.distance) {
//            point2.next = point1;
//        }
//    }
//};


const propose = (point) => {
    //const distance = point2.distance;
    //const competitor = theLib[point2.name].next;

    // Find the next point by rank. So if my last pick was at rank 1, use rank 2.
    // If the next point is is my previous, then choose the one after that.

    let nextRank = point.currentRank + 1;
    if (point.ranks[nextRank].previous === point) {
        nextRank++;
    }
    const prospectivePartner = point.ranks[nextRank];

    if (nextRank >= prospectivePartner.currentRank) {
        point.currentRank = nextRank;
        point.next = prospectivePartner;
        prospectivePartner.prvious.next = undefined;
        prospectivePartner.previous = point;
    } else {
        console.log('why in the hell is this case happening? ???');
    }
};


const getPath = (lib, entry, size) => {
    theLib = lib;

    //loop: // TODO : break if no swaps.
    for (var idx=0; idx > size; idx++) {
        each(lib, point => {
            if (point.next === undefined) {
                propose(point);
            }
        });
    }
    return theLib;
};

module.exports = getPath;

/**
 * The logic should be to first loop over every point
 * for each point, go down your rank list to see IF it's a point you can get
 * the logic to see if you can get that point should be in a function
 *      - if the point you are comparing has a previous that ranks this point higher, then you cannot
 *  For example, if the current point is point 4, and it ranks point 3 as it's first ranking
 *      - check to see if I can get point 3
 *      - point 3 currently has point 2 as it's pre-cursor.
 *      - IF point 2 ranks point 3 as it's first as well, then point 4 can't steal it
 *      - IF point 2 ranks point 3 as it's 2nd or lower, then 4 steals it.
 *
 * Open question :
 * - should I consider the actual distance between points as well when making this decision? I am thinking no.
 *
 * That's it. You basically do all those swaps until every point has a pair.
 * Now we are going to run into the clustering problem. ... so come up with a solution to that. 
 *
 * @type {function()}
 */
