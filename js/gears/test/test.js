"use strict";


const calculateQuotients = require('./calculateQuotients');
const buildUniquePairs = require('./buildUniquePairs');
const solve = require('./index');
const bruteForce = require('./bruteForce');
const calcFinalValue = require('./calcFinalValue');
const mergeSort = require('./mergeSort');
const timer = require('./timer');



// CALCULATING QUOTIENTS :
const findQuotiens = () => {
    const quotients = calculateQuotients(13, 50);
    console.log(quotients.length);
};

// BRUTE FORCE :
const bruteForceFour = () => {
    const solution = bruteForce.findFour(13, 50);
    console.log(solution); // [ 41, 22, 46, 27 ]
};

const bruteForceSix = () => {
    const solution1 = bruteForce.findSix(13, 50);
    console.log(solution1); // [ 35, 17, 38, 31, 39, 31 ]
};


// SOLUTION :
const findSolution = () => {
    let solution = solve({
        desiredNumber: 127,
        requiredFactors : [40],
        numberOfPairs: 3,
        lowerBound: 13,
        upperBound: 50
    });
    console.log(JSON.stringify(solution));
    const arr = solution.reduce((prev, { numerator, denominator }) => {
        return prev.concat([numerator, denominator]);
    }, []);
    console.log('The above solution gives : ');
    console.log(calcFinalValue.apply(null, arr));
};


const testListMaker = () => {
    const sortedQuotients = calculateQuotients(13, 50);
    const list = buildUniquePairs(sortedQuotients);
    console.log(list.length);

    let best = 100;
    let answer;
    list.forEach(obj => {
        sortedQuotients.forEach(qObj => {
            const arr = [ obj.factors[0].numerator, obj.factors[0].denominator,
                obj.factors[1].numerator, obj.factors[1].denominator,
                qObj.numerator, qObj.denominator ];

            const finalVal = calcFinalValue.apply(null, arr);
            const diff = Math.abs(127 - finalVal);
            if (diff < best) {
                best = diff;
                answer = arr;
            }
        });
    });

    console.log('Answer : ');
    console.log(answer);
};

const testMergeSort = () => {

    const arr = [1,2,5,6,7,2];
    const sorted = mergeSort(arr);
    console.log(sorted);

    const arr1 = [1,2,5,6,7,6,5,4,3,4,5,8,9,0,5,6,7,3,2,6,5,3,4,7,3,7,3,9,5];
    const sorted1 = mergeSort(arr1);
    console.log(sorted1);

    let arr2 = [];
    for (let i = 0; i <= 1400; i++) {
        arr2.push(Math.random() * 100);
    }

    const sorted2 = mergeSort(arr2);
    console.log(sorted2);
};



const time = timer(findSolution);
console.log(`finished solution in time of ${time}`);

