"use strict";

// 1.2 Being told that an unsorted array contains (n - 1) of n consecutive numbers (where the bounds are defined),
// find the missing number in O(n) time

const solve = (arr, upperBound, lowerBound) => {

    const used = {};
    const upper = upperBound - lowerBound;

    for (let i = 0; i < upper; i++) {
        used[arr[i]] = true;
    }

    let answer;
    loop:
    for (let j = lowerBound; j <= upperBound; j++) {
        if (used[j] === undefined) {
            answer = j;
            break loop;
        }
    }

    return answer;
};


const improvedSolution = (arr, upper, lower) => {

    let hopefulSum = 0;
    let actualSum = 0;

    for (let i = 0; i <= arr.length; i++) {
        hopefulSum += (lower + i);
        if (arr[i]) {
            actualSum += arr[i];
        }
    }

    return hopefulSum - actualSum;
};

const arr1 = [2, 5, 1, 4, 9, 6, 3, 7]; // missing 8
console.log(solve(arr1, 9, 1));
console.log(improvedSolution(arr1, 9, 1));