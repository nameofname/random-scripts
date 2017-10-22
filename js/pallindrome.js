"use strict";


// totally didn't think of this, but it's waaayyyy easier.
// but also it's less efficient.
const easyAnswer = str => {
    const tmpStr = str
        .replace(/\s/g, '')
        .toLowerCase();

    return tmpStr === tmpStr
            .split('')
            .reverse()
            .join('');
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

const checkHalves = (arr1, arr2) => {
    return arr1.reduce((prev, char, idx) => {
        return !prev ? prev : char === arr2[idx];
    }, true)
};
/**
 * Also runs in O(n) - but accounts for spaces.
 * @param str
 * @returns {[*,*]}
 */
const pallindromeImproved = str => {
    const arr = str.split('');
    const middle = Math.ceil((arr.length / 2));
    const bottom = [];
    const top = [];

    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i].toLowerCase();
        if (curr !== ' ') {
            if (i < middle) {
                bottom.push(curr);
            } else {
                top.unshift(curr);
            }
        }
    }

    let difference = bottom.length - top.length;
    while (Math.abs(difference) > 1) {
        if (bottom.length > top.length) {
            top.push(bottom.pop());
        } else {
            bottom.push(top.pop());
        }
        difference = bottom.length - top.length;
    }

    if (bottom.length !== top.length) {
        const longer = bottom.length > top.length ? bottom : top;
        longer.pop();
    }
    return checkHalves(bottom, top);
};


const true1 = 'ronaldlanor';
const true2 = 'Sana Ana S ';
const true3 = 'banana A n a N a b ';
const true4 = ' b a N a n A ananab';
const false1 = 'manface';


console.log(easyAnswer(true1));
console.log(easyAnswer(true2));
console.log(easyAnswer(false1));

console.log('--- --- --- --- --- --- --- --- --- --- --- ');

console.log(pallindrome(true1));
console.log(pallindrome(true2));
console.log(pallindrome(false1));

console.log('--- --- --- --- --- --- --- --- --- --- --- ');

console.log(pallindromeImproved(true1));
console.log(pallindromeImproved(true3));
console.log(pallindromeImproved(true4));
console.log(pallindromeImproved(false1));

module.exports = pallindrome;