"use strict";


module.exports = callback => {
    const start = Date.now();
    callback();
    const end = Date.now();
    return end - start;
};
