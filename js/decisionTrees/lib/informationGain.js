"use strict";

/**
 * Calculate the entropy for a given attribute value (branch).
 * @private
 */
const _sortInputs = (attributeValue, trainingInputs) => {
    //
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
 */
const ig = (trainingData, attributeMapObject) => {

    // // to get IG, we first need entropy for each of the branches
    // // loop over the attribute values, and for each we will sort the inputs into buckets that would flow down that path
    // const branchObject = attributeMapObject.values.map((value) => {
    //
    // });

    const trainingClassesArray = trainingData.reduce((prev, curr) => {
        if (!prev.contains(curr.class)) {
            prev.push(curr.class);
        }
        return prev;
    }, []);

    // here we want to sort each training input into a 2 teir list which is keyed on the attribute value and the
    // input classification. First build the data structure your inputs will fall into :
    const sortedInputs = new Map();
    attributeMapObject.values.forEach(possibleVal => {
        const possibleValMap = new Map();
        trainingClassesArray.forEach(possibleClass => {
            possibleValMap.set(possibleClass, [])
        });
        sortedInputs.set(possibleVal, possibleValMap);
    });

    // now that we have the empty 2 tier data structure, we will sort each input into those buckets :
    trainingData.forEach(input => {
        //
    });






};


// SAMPLE :
// this is what i want the sorted data thing to look like :
const obj = { // map
    attr1 : { // map
        class1 : [],
        class2 : [],
    },
    attr2 : { // map
        class1 : [],
        class2 : [],
    }
}
