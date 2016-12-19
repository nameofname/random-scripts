"use strict";


// the attributes map stores each of the attributes by key, it's possible values (calculated out if a range), and a
// function to test a given input for one of the possible attribute values
const sampleAttributesMap = new Map(
    [
        'color',
        {
            attributeName : 'color',
            possibleValues : ['red', 'green', 'blue', 'indigo', 'violet'],
            test : (input) => input.color
        }
    ]
);
const attributesMap = new Map();


const decisionTree = () => {};

