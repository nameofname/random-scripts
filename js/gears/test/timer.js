"use strict";


module.exports = callback => {

    const start = Date.now();
    callback();
    const end = Date.now();
    const time = end - start;
    console.log(`finished solution in time of ${time}`);
    return time;

};
