// https://github.com/kennymkchan/interview-questions-in-javascript#array
// 1.1 Given an array of integers, find the largest product yielded from three of the integers


const largestThree = require('../../largestThree');

const lergestProductOfThree = arr => {
    const largest = largestThree(arr);
    return largest[0] * largest[1] * largest[2];
};


console.log(lergestProductOfThree([1, 4, 5, 7, 3, 13, 10, 5, 11, 6, 9, 60, 2])); // 8580

console.log(largestThree(new Array(1000)
    .fill(0)
    .map(() => (Math.floor(Math.random() * 100000)))));