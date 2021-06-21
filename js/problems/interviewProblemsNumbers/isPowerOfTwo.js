"use strict";

// 5.1 Given an integer, determine if it is a power of 2. If so, return that number, else return -1.
// (0 is not a power of two)


const isPowerOfTwoBak = num => {
    if (num === 2 || num === 1) {
        return true;
    } else if (num === 0 || num % 2 !== 0) {
        return false;
    } else {
        return isPowerOfTwo(num / 2);
    }
};

// Came back years later and this is ... a much simpler solution
function isPowerOfTwo(num) {
    return Math.log2(num) % 1 === 0;
}

console.log(isPowerOfTwo(4)); // true
console.log(isPowerOfTwo(64)); // true
console.log(isPowerOfTwo(1)); // true
console.log(isPowerOfTwo(0)); // false
console.log(isPowerOfTwo(-1)); // false
console.log(isPowerOfTwo(1048576)); // true
