"use strict";

/**
 * Time a single run of a function execution
 */
module.exports = callback => {
    const start = Date.now();
    callback();
    const end = Date.now();
    return end - start;
};
