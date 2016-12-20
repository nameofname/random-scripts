"use strict";


// TODO !!! delete this - test code.
let incr = 0;

/**
 * This helper function builds a sorted map of the training data. The sorted output will be a map with 2 levels :
 *      L1 : a layer of maps, keyed on each attribute value
 *      L2 : a layer of arrays, each array including inputs sorted by class (classification)
 * Full structure is :
 *      - Map {
 *          [attribute value] : Map {
 *              total : number
 *              values : Map {
 *                  [category value] : [Array], ...
 *              }
 *          }, ...
 *      }
 * @param trainingData
 * @param attributeMapObject
 * @param classificationMapObject
 * @private
 */
const _buildSortedValueMap = (trainingData, attributeMapObject, classificationMapObject) => {
    const sortedInputs = new Map();
    const attrVals = attributeMapObject.values;
    const classVals = classificationMapObject.values;

    trainingData.forEach(input => {
        attrLoop:
            for (var i = 0; i < attrVals.length; i++) {
                const attrMatch = attributeMapObject.test(input, attrVals[i]);
                if (attrMatch) {
                    if (!sortedInputs.get(attrVals[i])) {
                        const newMap = new Map();
                        newMap.set('values', new Map());
                        newMap.set('total', 0);
                        newMap.set('entropy', 0);
                        sortedInputs.set(attrVals[i], newMap);
                    }
                    const currAttrMap = sortedInputs.get(attrVals[i]);
                    classLoop:
                        for (var j = 0; j < classVals.length; j++) {
                            const classMatch = classificationMapObject.test(input, classVals[j]);
                            if (classMatch) {
                                if (!currAttrMap.get('values').get(classVals[j])) {
                                    currAttrMap.get('values').set(classVals[j], []);
                                }
                                const currBucket = currAttrMap.get('values').get(classVals[j]);
                                currBucket.push(input);
                                currAttrMap.set('total', (currAttrMap.get('total') + 1));
                                break classLoop;
                            }
                        }
                    break attrLoop;
                }
            }
    });

    return sortedInputs;
};

// probability (used in entropy)
const probability = (val, total) => (val / total);
// entropy iterator is a single step in calculating entropy of a series
const _entropyIterator = (val, total) => (probability(val, total) * Math.log2(probability(val, total)));
// get the entropy for a single series :
// to calculate entropy, for each probability in series multiply by log2(probability) - subtract the result from prev
const entropyForSeries = (catMap, total) => {
    let out = 0;
    for (let arr of catMap.values()) {
        out -= _entropyIterator(arr.length, total);
    }
    return out;
};


/**
 * Calculate the information gain at a specified branch node.
 * what do you need to take in the info gain?
 *
 * @param trainingData <array> - an array of objects, each one is a data input having all of the attributes expressed
 *      in the attributeMap
 * @param attributeMapObject <object> - an object with information about a given attribute. This comes from the
 *      attribute map builder. Includes :
 *      - name
 *      - type (number, word, date, enum)
 *      - possible values
 *      - test function - a function to test a training input against the attribute value
 * @param classificationMapObject <object> - same as attributeMapObject, but for the classification attribute instead
 *      of the attribute value.
 */
const ig = (trainingData, attributeMapObject, classificationMapObject) => {
    // here we want to sort each training input into a 2 teir list which is keyed on the attribute value and the
    // input classification. First build the data structure your inputs will fall into :
    const totalLength = trainingData.length;
    // here we want to sort each training input into a 2 teir list which is keyed on the attribute value and the
    // input classification. The first level of this structure is a map, the lower level an array.
    const sortedInputs = _buildSortedValueMap(trainingData, attributeMapObject, classificationMapObject);

    // now get the entropy for each of the buckets discovered - each L1 bucket is a possible branch, each L2 bucket
    // expresses the uncertainty within it (it's divided amongst the different classes).
    // _calculateEntropies(sortedInputs, totalLength);
    // const entropies = [];
    // here attrMap is a map with 2 props : total and values. values is another map of cat val to array
    for (let attrMap of sortedInputs.values()) {
        const entropy = entropyForSeries(attrMap.get('values'), totalLength);
        attrMap.set('entropy', entropy);
    }

    // console.log('THIS IS FUCKING HAPPENING', sortedInputs);

    let infoGain = 1;
    // to calculate info gain, in series we subtract probability * etnropy
    // note here we are talking about the probability of the L1 bucket, of the given attribute value, not related to
    // the L2 buckets of classes.
    for (let attrMap of sortedInputs.values()) {
        const probability = attrMap.get('total') / totalLength;
        const entropy = attrMap.get('entropy');
        infoGain -= (probability * entropy)
    }

    return infoGain;

    // // TODO !!! test code :
    // if (incr > 0) {
    //     process.exit();
    // }
    // incr++;
};

module.exports = ig;