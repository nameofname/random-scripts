"use strict";


const uniq = require('lodash.uniq');
const connection = mysql.createConnection(dbConfig);
connection.query('show columns', (err, res) => { console.og('error - ', err); console.log('res - ', res) })


/**
 // * IMPORTANT! The training data passed to this function to build up the map MUST include all attribute values for each
 // * individual input! The map is built based on the attributes from the 0th input in the training data, so if it's
 // * missing some portion of the attributes then the map will not be built correctly!!! Don't mess with me man.
 *
 */

/**
 *
 * @param fields <array> - of objects each of which describes an attribute field.
 *      - from MYSQL, should have a field name and type.
 * @param trainingData <array> - of training data objects
 */
const buildMap = (fields, trainingData) => {

    const attributeKeys = trainingData[0].keys();

    const map = trainingData.reduce((outputMap, input) => {

        //

    }, new Map());
};
