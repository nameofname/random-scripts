"use strict"; 

/**
 * Replace two or more spaces in a string with one space. 
 */
const alternateSolution = str => {
    let s = str.replace(/\n/g, '');
    while (s.match(/\s\s/g)) {
        s = s.replace(/\s\s/g, ' ')
        console.log(s)
    }
    return s;
};

module.exports = str => {
    return str.replace(/\s+ /g, ' ');
};
