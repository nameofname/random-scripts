"use strict";

//const sampleData = { // NOTE : not used
//    philadelphia : {
//        name : 'philadelphia',
//        pairing : {
//            name : 'washington dc',
//            distance : 1
//        },
//        ranks : [
//            {
//                name : 'nyc',
//                distance : 3
//            },
//            {
//                name : 'washington dc',
//                distance : 2
//                // not sure if this should actually be a key value pair, but
//            }
//        ]
//    }
//};

const each = require("./each");
const getDistance = require("./getDistance");
const singleSort = require("./singleSort");

/**
 * The 1st function of the set. Loop over every point and creates a library of distance information between the points
 * @param name - string
 * @param coordinates - array, the [x,y] of city's location
 */
const add = (lib, name, coordinates) => {
    const c = {};
    c.name = name;
    c.ranks = [];
    c.coordinates = coordinates;
    c.currentRank = 0;

    let distance;
    // loop over all of the points and calculate distance for each.
    // for each, also sort the distance of the new point into the correct order of that city's ranks
    each(lib, currPoint => {
        distance = getDistance(c.coordinates, currPoint.coordinates);
        c.ranks.unshift({
            name : currPoint.name,
            distance : distance
        });
        currPoint.ranks.unshift({
            name : c.name,
            distance : distance
        });

        // now short-sort each of the ranks.
        // NOTE!!!! It might be better to only sort the ranks for the point being added once with something like a
        // merge sort, will need to test that one.
        singleSort(c.ranks);
        singleSort(currPoint.ranks);
    });


    // finally assign c itself to the library (a small efficiency, this ensures it's not in the above loop un-necessarily).
    lib[name] = c;
};


module.exports = add;