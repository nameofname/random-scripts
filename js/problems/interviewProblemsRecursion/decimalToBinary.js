"use strict";
// 4.1 Write a recursive function that returns the binary string of a given decimal number Given 4 as the decimal input,
// the function should return 100

const _recur = (arr, int) => {
    if (int === 0) {
        return arr;
    }


    let carryBit = 1;
    let i = arr.length - 1;

    while (carryBit && i >= 0) {
        arr[i] = arr[i] === 0 ? 1 : 0;
        carryBit = (arr[i] === 0) ? 1 : 0;
        --i;
    }

    if (i === - 1) {
        arr.unshift(1);
    }

    return _recur(arr, --int);
};

const decimalToBinary = num => {
    const arr = _recur([], num);
    return arr.join('');
};

console.log(decimalToBinary(4)); // 100
console.log(decimalToBinary(5)); // 101
console.log(decimalToBinary(6)); // 110
console.log(decimalToBinary(7)); // 111
console.log(decimalToBinary(8)); // 1000

