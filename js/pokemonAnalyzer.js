"use strict"; 


const data = require("./pokemonData.json");
const log = require('./colorLog');


/**
 * dataContainer is a factory for the exported object. Used here to promote chaining.
 * examples :
 *      const analyzer = require('./pokemonAnalyzer.js')
 *
 *      analyzer
 *          .getBottom(5)
 *          .getTop(1)
 *          .val();
 *
 *      analyzer
 *          .findByName('arbok')
 *          .val(['name', 'rank']);
 *
 * @param a
 */
const dataContainer = function (a) { this.value = a };


// assign a rank type array to each pokemon :
data.forEach((o, idx) => { o.rank = idx; });
data.forEach(o => {
    o.type = o.type
        .split(/(?=[A-Z])/)
        .map(s => s.toLowerCase() )
});


// dataContainer.prototype.log = function () { return log.green(JSON.stringify(this.value)); };

/**
 * findByName - find a pokemon object by name
 * @param name
 * @returns {dataContainer}
 */
dataContainer.prototype.findByName = function (name) {
    const arr = data.reduce((prev, o) => {
        if (prev) {
            return prev;
        } else {
            return o.name.toLowerCase() === name.toLowerCase() ? o : null 
        }
    }, null);
    return new dataContainer([arr]);
};

/**
 * Gets the top N pokemon of a data set
 * @param n
 * @returns {dataContainer}
 */
dataContainer.prototype.getTop = function (n) {
    const arr = [];
    for (let i=0; i<n; i++) {
        arr.push(this.value[i]);
    }
    return new dataContainer(arr);
};

/**
 * gets the bottom N of a data set
 * @param n
 * @returns {dataContainer}
 */
dataContainer.prototype.getBottom = function (n) {
    const arr = [];
    const len = this.value.length;
    for (let i=len; i>=len-n; i--) {
        arr.unshift(this.value[i]);
    }
    return new dataContainer(arr);
};

/**
 *  filters pokemon data set by type (ie. "water" or "electric")
 * @param type
 * @returns {dataContainer}
 */
dataContainer.prototype.filterByType = function (type) {
    const arr = this.value.filter((o, idx) => {
        return o.type.indexOf(type) !== -1;
    });
    return new dataContainer(arr);
};

/**
 * Returns the value of a data set sans the wrapper object.
 * Pass in an array of keys to trim down your data set
 * eg.
 *      analyzer.findByName('arbok').val(['name', 'rank'])
 * @param keys <array>
 * @returns {Array}
 */
dataContainer.prototype.val = function (keys) {
    return this.value.map(o => {
        return keys.reduce((prev, k) => {
            prev[k] = o[k]; return prev;
        }, {});
    });
};

/**
 * Logs the resultant data set in green
 * @type {loggo}
 */
dataContainer.prototype.log = function () {
    log.green(this.value);
    return this;
};

const analyzer = new dataContainer(data);
module.exports = analyzer;

