"use strict";
// 1.4 Given an array of integers, find the largest difference between two elements such that the element of
// lesser value must come before the greater element

// At first I thought this could be solved in factorial time, but I read the solution, and it can be done in one pass
// The thing you have to realize is that as you go from left to right, you can encounter higher 'max' numbers, but you
// always want to hang on to the lowest min number. So you can get a higher 'difference' - but you would never adjust
// your 'lowest' number as you go.

const highestDifference = arr => {
    let currMin = arr[0];
    return arr.reduce((currDifference, int) => {
        currMin = int < currMin ? int : currMin;
        const difference = int - currMin;
        console.log(difference)
        return difference > currDifference ? difference : currDifference;
    }, 0);
};

const arr1 = [7, 8, 4, 9, 9, 15, 3, 1, 10]; // should return 11 not 14, even though 1 is lower than 4, it comes after 15

console.log(highestDifference(arr1));