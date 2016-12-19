"use strict";


const asyncQuery = require('./asyncQuery');
const numberTypes = ['int', 'decimal', 'bigint', 'float', 'float unsigned', 'tinyint'];
const wordTypes = ['varchar', 'tinytext', 'text', 'mediumtext'];
const ATTRIBUTE_NUM_CUTOFF = 20;

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

// TODO - need to add explicit sorting logic?
// values = possibleValues.sort((a, b) => {
//     if (a > b) return 1;
//     if (a < b) return -1;
//     if (a === b) return 0;
// })

// TODO !!! in numeric ranges, account for null attribute values
const _getNumRangesAndTestFn = (fieldName, possibleValues) => {
    // if there are fewer than N numbers in the list, it's easy enough to branch on those specific attribute values :
    if (possibleValues.length < ATTRIBUTE_NUM_CUTOFF) {
        return {
            values: possibleValues,
            test: (input, val) => {
                return (input[fieldName] === val);
            }
        };
    }

    // else we must calculate numeric ranges and create test functions for those ranges :
    const values = [];
    const sorted = possibleValues.sort();
    const lowest = sorted[0];
    const highest = sorted[sorted.length - 1];
    const range = highest - lowest;
    const tenth = range * 0.1;

    for (var i = 0; i < ATTRIBUTE_NUM_CUTOFF; i++) {
        const lowerBound = lowest + (i * tenth);
        const upperBound = lowest + ((i + 1) * tenth);
        values.push([lowerBound, upperBound]);
    }

    return {
        values,
        range: true,
        test: (input, range) => {
            return (input[fieldName] > range[0] && input[fieldName] <= range[1]);
        }
    };
};


const _getWordValuesAndTestFn = (fieldName, possibleValues) => {
    if (possibleValues.length < ATTRIBUTE_NUM_CUTOFF) {
        return {
            values: possibleValues,
            test: (input, val) => input[fieldName] === val
        };
    }
    return false;
};


// TODO - I don't need this do I ?
// const _getDateRanges = (possibleValues) => {
//     return 'fuuuuuuck.'
// };


/**
 *
 * @param fields <array> - of objects each of which describes an attribute field.
 *      - from MYSQL, should have a field name and type.
 * @param trainingData <array> - of training data objects
 */
module.exports = async (trainingData, attributes) => {

    const map = new Map();

    attributes.forEach(attr => {
        const attributeName = attr.Field;
        const attrType = attr.Type.split('(')[0];
        let type;

        if (numberTypes.includes(attrType)) {
            type = 'number';
        } else if (wordTypes.includes(attrType)) {
            type = 'word';
        } else if (attrType === 'timestamp') {
            type = 'date';
        } else if (attrType === 'enum') {
            type = 'enum';
        } else {
            throw Error('An unrecognized data type showed up. Sharks.');
            return;
        }

        const possibleValues = trainingData.reduce((outputArr, input) => {
            if (outputArr.indexOf(input[attributeName]) === -1) {
                outputArr.push(input[attributeName]);
            }
            return outputArr;
        }, []);

        // if this is a text input field with more than 50 values we don't want to index on it
        // unless I think of a smart way to do that in the future.
        if (type === 'word' && possibleValues.length > ATTRIBUTE_NUM_CUTOFF) {
            return;
        }

        let valuesAndTest;

        if (type === 'number' || type === 'date') {
            valuesAndTest = _getNumRangesAndTestFn(attributeName, possibleValues);
        } else if (type === 'word') {
            valuesAndTest = _getWordValuesAndTestFn(attributeName, possibleValues);
        } else if (type === 'enum') {
            valuesAndTest = {
                values: possibleValues,
                test: (input, value) => input[attributeName] === value
            };
        }

        const obj = Object.assign({}, {
            type,
            attributeName
        }, valuesAndTest);

        map.set(attributeName, obj)

    });

    return map;
};
