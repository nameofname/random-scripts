"use strict";


// const uniq = require('lodash.uniq'); / TODO ! maybe don't need this?
const syncQuery = require('./syncQuery');

// the attributes map stores each of the attributes by key, it's possible values (calculated out if a range), and a
// function to test a given input for one of the possible attribute values
// const sampleAttributesMap = new Map(
//     [
//         'color',
//         {
//             attributeName : 'color',
//             possibleValues : ['red', 'green', 'blue', 'indigo', 'violet'],
//             test : (input) => input.color
//         }
//     ]
// );

/**
 *
 * @param fields <array> - of objects each of which describes an attribute field.
 *      - from MYSQL, should have a field name and type.
 * @param trainingData <array> - of training data objects
 */
module.exports = (dbTableName, trainingData) => {

    const attributeKeys = syncQuery(`SHOW COLUMNS FROM ${dbTableName}`);

    const map = trainingData.reduce((outputMap, input) => {

        //

    }, new Map());

    return map;

};
