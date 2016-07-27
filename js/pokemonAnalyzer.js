"use strict"; 


const data = require("./pokemonData.json");
const log = require('./colorLog');


/**
 * dataContainer is a factory for the exported object. Used here to promote chaining.
 * examples :
 *      const analyzer = require('./pokemonAnalyzer.js')
 *      analyzer.getBottom(5)
 *          .getTop(1)
 *          .val();
 *
 * @param a
 */
const dataContainer = function (a) { this.value = a };
dataContainer.prototype = Array;


// assign a rank type array to each pokemon :
data.forEach((o, idx) => { o.rank = idx; });
data.forEach(o => {
    o.type = o.type
        .split(/(?=[A-Z])/)
        .map(s => s.toLowerCase() )
});


dataContainer.prototype.val = function () { return this.value; };
// dataContainer.prototype.log = function () { return log.green(JSON.stringify(this.value)); };


dataContainer.prototype.findByName = function (name) {
    const arr = data.reduce((prev, o) => {
        if (prev) {
            return prev
        } else {
            return o.name.toLowerCase() === name.toLowerCase() ? o : null 
        }
    }, null);
    return new dataContainer(arr);
};


dataContainer.prototype.getTop = function (n) {
    const arr = [];
    for (let i=0; i<n; i++) {
        arr.push(this.value[i]);
    }
    return new dataContainer(arr);
};


dataContainer.prototype.getBottom = function (n) {
    const arr = [];
    const len = this.value.length;
    for (let i=len; i>=len-n; i--) {
        arr.unshift(this.value[i]);
    }
    return new dataContainer(arr);
};

dataContainer.prototype.filterByType = function (type) {
    const arr = this.value.filter((o, idx) => {
        return o.type.indexOf(type) !== -1;
    });
    return new dataContainer(arr);
};



module.exports = new dataContainer(data);

