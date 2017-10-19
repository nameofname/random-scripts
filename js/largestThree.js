"use strict";

const addToTop = (arr, int) => {
    let found;

    if (!arr.length) {
        arr.push(int);
        return arr;
    }

    loop:
        for (let i = arr.length; i > 0; i--) {
            const curr = arr[i - 1];
            if (curr === undefined || curr < int) {
                found = i;
                break loop;
            }
        }
    if (found !== undefined) {
        if (arr.length === 3) {
            arr.splice(found, 0, int);
            arr.shift();
        } else {
            arr.push(int)
        }
    }
    return arr;
};

const largestThree = arr => arr.reduce((a, curr) => {
    return addToTop(a, curr);
}, []);

module.exports = largestThree;