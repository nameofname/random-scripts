"use strict";


module.exports = (i, j, k, l, m, n) => {
    if (m === undefined && n === undefined) {
        return (i/j) * (k/l) * 40;
    }
    return (i/j) * (k/l) * (m/n) * 40;
};


