"use strict"; 

// function to randoomize an array in 1 line : 
module.exports = arr => {
    return arr.reduce((prev, n) => { const rand = Math.floor(Math.random() * arr.length); prev.push(prev.splice(rand, 1)[0]); return prev }, arr);
};

/**
 * Another easy one using for loop
 */
function randomizeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        const swapIdx = i + Math.ceil(Math.random() * (arr.length - 1 - i));
        const tmp = arr[i];
        arr[i] = arr[swapIdx];
        arr[swapIdx] = tmp;
    }
    return arr;
}

console.log(randomizeArray([1,2,3,4,5,6,7,8,9]));