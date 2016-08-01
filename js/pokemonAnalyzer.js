"use strict"; 
// TODO !!!!!!!!!! https://github.com/andromedado/pokemon-go-iv-calculator/tree/master/support


const data = require("./pokemonData.json");
const log = require('./colorLog');
const allKeys = Object.keys(data[0]);

/**
 * dataContainer is a factory for the exported object. Used here to promote chaining.
 * examples :
 *      const analyzer = require('./pokemonAnalyzer.js')
 *      analyzer.getBottom(5)
 *          .filterByType('electric')
 *          .getTop(3)
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
    const obj = data.reduce((prev, o) => {
        if (prev) {
            return prev;
        } else {
            return o.name.toLowerCase() === name.toLowerCase() ? o : null 
        }
    }, null);
    return new dataContainer((obj ? [obj] : []));
};

/**
 * Gets the top N pokemon of a data set
 * @param n
 * @returns {dataContainer}
 */
dataContainer.prototype.getTop = function (n) {
    return new dataContainer(this.value.slice(0, n));
};

/**
 * gets the bottom N of a data set
 * @param n
 * @returns {dataContainer}
 */
dataContainer.prototype.getBottom = function (n) {
    const len = this.value.length;
    return new dataContainer(this.value.slice((len-n), len));
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
    keys = (keys instanceof Array) ? keys : [keys];
    if (!this.value.length) return undefined;
    if (!keys.length) { keys = allKeys }

    return this.value.map(o => {
        return keys.reduce((prev, key) => {
            prev[key] = o[key]; return prev;
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

dataContainer.prototype.summary = function (name) {
    if (name) {
        return this.findByName(name).val(['name', 'rank']);
    }
    return this.val(['name', 'rank']);
};

dataContainer.prototype.help = function (name) {
    for (var i in this) {console.log(i)}
};

const analyzer = new dataContainer(data);
module.exports = analyzer;


console.log(
    analyzer.getTop(30).summary()
)
