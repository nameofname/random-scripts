"use strict";


// totally didn't think of this, but it's waaayyyy easier.
// but also it's less efficient.
const easyAnswer = str => {
    return str === str.split('').reverse().join('');
};


const pallindrome = str => {
    const arr = str.split('');
    const middle = (arr.length / 2) + (arr.length % 1);
    for (let i = 0; i < arr.length; i++) {
        if (i !== middle && arr[i] !== arr[arr.length - (i + 1)]) {
            return false;
        }
    }
    return true;
};


console.log(pallindrome('ronaldlanor'));
console.log(pallindrome('manface'));
console.log(pallindrome('abcba'));

console.log(easyAnswer('ronaldlanor'));
console.log(easyAnswer('manface'));
console.log(easyAnswer('abcba'));


module.exports = pallindrome;