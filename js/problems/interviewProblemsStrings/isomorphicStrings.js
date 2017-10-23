"use strict";

// 2.3 Check if a given string is a isomorphic

// For two strings to be isomorphic, all occurrences of a character in string A can be replaced with another character
// to get string B. The order of the characters must be preserved. There must be one-to-one mapping for ever char of
// string A to every char of string B.
//
//     `paper` and `title` would return true.
//     `egg` and `sad` would return false.
//     `dgg` and `add` would return true.

const numArray = s => {
    const map = {};
    let curr = 1;
    return s
        .split('')
        .map((letter, idx) => {
            map[letter] = map[letter] || ++curr;
            return map[letter];
        })
        .join('');
};

const isomorphic = (s1, s2) => {
    return numArray(s1) === numArray(s2);
};

console.log(isomorphic('paper', 'title')); // true
console.log(isomorphic('egg', 'sad')); // false
console.log(isomorphic('dgg', 'add')); // true