"use strict";


const buildAttributeMap = require('./buildAttributeMap');
const informationGain = require('./informationGain');
let attributeMap;

/**
 * Recursive function builds the decision tree based on info gain, etc.
 * @param trainingData
 * @param attributeKeys
 * @private
 */
const _buildTree = (trainingData, attributeKeys, node) => {
    const highestIGAttribute = attributeKeys.reduce((prev, attrKey) => {

        const ig = informationGain(trainingData, attributeMap.get(attrKey));
        console.log(`I got the information gain!!!!! For ${attrKey} : ${ig}`);

    }, null);
};


/**
 *
 * @param getData <function> - async function that returns an object with the following properties :
 *      - trainingData <array> of objects (training inputs)
 *      - attributes <array> of objects (attributes ie. DB columns)
 *      - classificationAttribute <string> the attribute name to use as classifier
 */
const decisionTreeBuilder = async (getData) => {
    console.log('START building decision tree');

    const decisionTree = {};
    const { trainingData, attributes, classificationAttribute } = await getData();
    attributeMap = await buildAttributeMap(trainingData, attributes);
    const attributeKeyArray = attributeMap.keys();

    // classify each of the training inputs according to the classification attribute.
    trainingData.forEach(obj => {
        const possibleValues = attributeMap.get(classificationAttribute).values;
        const testFn = attributeMap.get(classificationAttribute).test;

        classFinder:
        for (var i = 0; i < possibleValues.length; i++) {
            if (testFn(obj, possibleValues[i])) {
                obj.class = possibleValues[i];
                break classFinder;
            }
        }
    });

    // trainingData.forEach((o, key) => {
    //     console.log(o.class)
    // });

    return;

    _buildTree(trainingData, attributeKeyArray, decisionTree);
    console.log('attributeMap', attributeMap);


    return decisionTree;
};

module.exports = decisionTreeBuilder;
