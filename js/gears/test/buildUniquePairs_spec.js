"use strict";


const timer = require('./timer');
const calculateQuotients = require('../src/calculateQuotients');
const buildUniquePairs = require('../src/buildUniquePairs');
const calcFinalValue = require('../src/calcFinalValue');


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

timer(testListMaker);
