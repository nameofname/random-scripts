"use strict";

const timer = require('../timer');
const { mySolution, onlineSolution } = require('./pallindrome');


// The range for lowercase letters is 97 - 122.
const str1 = new Array(10000)
    .fill('')
    .map((d, idx) => {
        const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        if (Math.random() > 0.91) {
            return ' ';
        }
        return Math.random() < 0.2 ? letter.toUpperCase() : letter;
    })
    .join('');



console.log('web time : ', timer(() => onlineSolution(str1)));
console.log('my time : ', timer(() => mySolution(str1)));