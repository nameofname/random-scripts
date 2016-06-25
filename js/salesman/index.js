"use strict";

const add = require("./src/add");
const getPath = require("./src/getPath");
const bruteForce = require("./src/bruteForce");

// part 1 of the code will be to take in points and put them into the map.
// 1. compare to all other points in the map, and calculate distance
// 2. sort each one.

const sampleData = { // NOTE : not used
    philadelphia : {
        name : 'philadelphia',
        pairing : {
            name : 'washington dc',
            distance : 1
        },
        ranks : [
            {
                name : 'nyc',
                distance : 3
            },
            {
                name : 'washington dc',
                distance : 2
                // not sure if this should actually be a key value pair, but
            }
        ]
    }
};

// This is the store of all the point data in the system.
const lib = {};

add(lib, 'one', [1,1]);
add(lib, 'two', [1,2]);
add(lib, 'three', [2,3]);
add(lib, 'four', [2,10]);
// add(lib, 'five', [6,6]);
// add(lib, 'six', [7,10]);


// console.log(JSON.stringify(lib));
//console.log('--------------------- solution : ');
//console.log(getPath(lib, lib['one'], Object.keys(lib).length));

console.log('--------------------- BRUTE FORCE : ');
console.log(bruteForce(lib));


// Step 2 : we compare to every other city and do the following :
// 1. if the city is closer than it's current pairing, then make it the pairing,
//      - Unless - that city's pairing is this cty.
//      - in that case, you must go another round becasuse a city cannot be paired to the city that is paired to it, or
//        else they form a duo, not a part of the chain
//

// Notes :
// I think I can cut down on the 2nd step by looking at the loop,
// for each round,
//      IF no rejections were processed
//      THEN terminate the loop, for efficiency.
// This should cut down on the number of loops significantly, because it's highly unlikely that any loop will make it
// all the way down to the end.

// A concern about the solution :
// I am worried that the rejection logic won't work out ... but it should if the solution is done in rounds like the
// stable marriage. Let's test that theory.

// IMPORTANT!!!
// I just realized there is a flaw in my logic. My code finds a "next" buddy for each point, and the distance between
// the point and it's next buddy is the lowest distance if possible. However since for a set of 2 points within
// the entire set both points can't have each other as their next buddies, I get the next closest point for the point
// in that pair that doesn't have a next buddy yet.

// Therefore, both points will get next buddies that are the best available suited to them, but the order of those 2
// points in the resultant set won't necessarily be the most advantageous... will they? I have to experiment.