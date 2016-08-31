"use strict"; 

module.exports = str => {
    let s = str.replace(/\n/g, '');
    while (s.match(/\s\s/g)) {
        s = s.replace(/\s\s/g, ' ')
        console.log(s)
    }
    return s;
};

