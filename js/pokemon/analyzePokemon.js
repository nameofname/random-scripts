"use strict"; 


// Data courtesy of the silph road :
// URL:https://thesilphroad.com/js/monRater.data.js?2.0
const data = require("./pokemonGoData").reverse();
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
            return o.Name.toLowerCase() === name.toLowerCase() ? o : null
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
        return (o.Type1.toLowerCase() === type.toLowerCase())
            || (o.Type2.toLowerCase() === type.toLowerCase());
    });
    return new dataContainer(arr);
};

/**
 * Filters on name substring, ie. finds "Ninetales" if you search for "nine"
 * @param type
 * @returns {dataContainer}
 */
dataContainer.prototype.filterByNameMatch = function (str) {
    const arr = this.value.filter((o) => {
        return o.Name.toLowerCase().indexOf(str.toLowerCase()) !== -1;
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
    keys = (typeof keys === 'string') ? [keys] : keys;
    if (!this.value.length) return undefined;
    if (!keys || !keys.length) { keys = allKeys }

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
    const arr = ['Name', 'Total', 'Rank'];
    if (name) {
        return this.findByName(name).val(arr);
    }
    return this.val(arr);
};

dataContainer.prototype.help = function (name) {
    for (var i in this) {log.green(i)}
};

const analyzer = new dataContainer(data);
module.exports = analyzer;

