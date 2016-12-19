"use strict";


const asyncQuery = require('./asyncQuery');
const numberTypes = ['int', 'decimal', 'bigint', 'float', 'float unsigned', 'tinyint'];
const wordTypes = ['varchar', 'tinytext', 'text', 'mediumtext'];

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
module.exports = async (dbTableName, trainingData) => {

    const attributes = await asyncQuery(`SHOW COLUMNS FROM ${dbTableName}`);

    const map = new Map();

    attributes.forEach(attr => {
        const attrType = attr.Type.split('(')[0];
        let type;

        if (numberTypes.contains(attrType)) {
            type = 'number';
        } else if (wordTypes.contains(attrType)) {
            type = 'word';
        } else if (attrType === 'timestamp') {
            type = 'date';
        } else if (attrType === 'enum') {
            type = 'enum';
        } else {
            throw Error('An unrecognized data type showed up. Sharks.')
        }

        const possibleValues = trainingData.reduce((outputArr, input) => {
            if (outputArr.indexOf(input[attr.Field]) === -1) {
                outputArr.push(input[attr.Field]);
            }
            return outputArr;
        }, []);

        let values;

        if (type === 'number') {
            values = possibleValues.sort();
            const lowest = values[0];
            const highest = values[values.length - 1];

            // values = possibleValues.sort((a, b) => {
            //     if (a > b) return 1;
            //     if (a < b) return -1;
            //     if (a === b) return 0;
            // })
        }

        const obj = {
            type,
            attributeName : attr.Field,
            values,
            test : (input, attributeValue) => (input[attr.Field] === attributeValue)
        };
        map.set(attr.Field, obj)
    });

    return map;
};
