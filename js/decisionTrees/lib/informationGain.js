"use strict";


// // SAMPLE :
// // this is what i want the sorted data thing to look like :
// const obj = { // map
//     attr1 : { // map
//         class1 : [],
//         class2 : []
//     },
//     attr2 : { // map
//         class1 : [],
//         class2 : []
//     }
// }
// /**
//  * Calculate the entropy for a given attribute value (branch).
//  * @private
//  */
// const _sortInputs = (attributeValue, trainingInputs) => {
//     //
// };


// OLD test code - this is the WHILE Loop version of the nested breaking for loops in the IG function below.
// It's a little messier, I think it has a bug ...

// here we want to sort each training input into a 2 teir list which is keyed on the attribute value and the
// input classification. The first level of this structure is a map, the lower level an array.
// trainingData.forEach(input => {
//     let attrTest = 0;
//     while (typeof attrTest === 'number') {
//         const testAttr = attrVals[attrTest];
//         const attrMatch = attributeMapObject.test(input, testAttr);
//
//         if (attrMatch) {
//             attrTest = true;
//             if (!sortedInputs.get(testAttr)) {
//                 sortedInputs.set(testAttr, new Map());
//             }
//             const attrBucket = sortedInputs.get(testAttr);
//
//             let classTest = 0;
//             while (typeof classTest === 'number') {
//                 const testClass = classVals[classTest];
//                 const classMatch = attributeMapObject.test(input, testClass);
//
//                 if (classMatch) {
//                     classTest = true;
//                     if (!attrBucket.get(testClass)) {
//                         attrBucket.set(testClass, []);
//                     }
//                     const classBucket = attrBucket.get(testClass);
//                     classBucket.push(input);
//                 }
//             }
//         }
//     }
// });



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
    const sortedInputs = new Map();
    const attrVals = attributeMapObject.values;
    const classVals = classificationMapObject.values;

    console.log('THIS IS FUCKING HAPPENING. part 1 : the first ... happening')
    // now that we have the empty 2 tier data structure, we will sort each input into those buckets :
    // here we want to sort each training input into a 2 teir list which is keyed on the attribute value and the
    // input classification. The first level of this structure is a map, the lower level an array.
    trainingData.forEach(input => {
        attrLoop:
            for (var i = 0; i < attrVals.length; i++) {
                const attrMatch = attributeMapObject.test(input, attrVals[i]);
                if (attrMatch) {
                    if (!sortedInputs.get(attrVals[i])) {
                        sortedInputs.set(attrVals[i], new Map());
                    }
                    classLoop:
                        for (var j = 0; j < classVals.length; j++) {
                            const classMatch = classificationMapObject.test(input, classVals[j]);
                            if (classMatch) {
                                if (!sortedInputs.get(attrVals[i]).get(classVals[j])) {
                                    sortedInputs.get(attrVals[i]).set(classVals[j], []);
                                }
                                sortedInputs.get(attrVals[i]).get(classVals[j]).push(input);
                                break classLoop;
                            }
                        }
                    break attrLoop;
                }
            }
    });

    console.log('THIS IS FUCKING HAPPENING', sortedInputs)
    // process.exit();
};

module.exports = ig;