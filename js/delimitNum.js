"use strict";

// takes in a number and returs a string, comma delimited
function delimitNum(n) {
    if (typeof n !== 'number') throw new Error(`invalid argument ${n} passed to delimitNum`)
    const na = String(n).split('.');
    const decimal = na[1];
    const int = na[0]
    const a = [];
    for (let i = int.length - 1; i >= 0; i--) {
        if (i !== (int.length - 1) && (int.length - 1 - i) % 3 === 0) a.unshift(',');
        a.unshift(int[i]);
    }
    const res = a.join('');
    return decimal ? `${res}.${decimal}` : res;
}

// console.log(delimitNum(1234567.555))
// console.log(delimitNum(123456))

module.exports = delimitNum;