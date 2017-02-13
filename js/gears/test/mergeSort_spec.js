"use strict";


const mergeSort = require('../src/mergeSort');
const timer = require('./timer');


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


timer(testMergeSort);
