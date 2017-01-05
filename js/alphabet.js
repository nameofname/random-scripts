"use strict";

// a JS function that returns the full alphabet with both lowercase and uppercase letters
module.exports = new Array(26)
    .fill(null)
    .map((n, idx) => {
        const s = String.fromCharCode(idx + 97); 
        return [s, s.toUpperCase()];
     })
    .reduce((prev, arr) => prev.concat(arr));
