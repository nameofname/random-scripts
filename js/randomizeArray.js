"use strict"; 

// function to randoomize an array in 1 line : 
module.exports = arr => {
    return arr.reduce((prev, n) => { const rand = Math.floor(Math.random() * arr.length); prev.push(prev.splice(rand, 1)[0]); return prev }, arr);
};
