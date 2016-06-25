"use strict";

/**
 * a short method for iterating over all the keys of a given object.
 * @param obj
 * @param callback
 * @returns {*}
 */
const each = (obj, callback) => {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            callback(obj[i], i);
        }
    }
};

module.exports = each;
