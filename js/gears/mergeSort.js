"use strict";


let itar = 0;

const _merge = (arr1, arr2) => {
    const arr = [];
    const len = arr1.length + arr2.length;
    let lowIdx = 0;
    let highIdx = 0;

    for (let i = 0; i < len; i++) {
        itar++;

        const left = arr1[lowIdx];
        const right = arr2[highIdx];

        if (left === undefined) {
            arr[i] = right;
            highIdx++;
        } else if (right === undefined) {
            arr[i] = left;
            arr[i] = (left === undefined) ? right : left;
            lowIdx++;
        } else {
            if (left <= right) {
                arr[i] = left;
                lowIdx++;
            } else {
                arr[i] = right;
                highIdx++;
            }
        }

    }
    return arr;
};


const mergeSort = (arr) => {

    if (arr.length === 1) {
        return arr;
    } else {

        const halfWay = Math.floor(arr.length / 2);
        let arr1 = arr.slice(0, halfWay);
        let arr2 = arr.slice(halfWay, arr.length);

        if (arr1.length > 1) {
            arr1 = mergeSort(arr1);
        }
        if (arr2.length > 1) {
            arr2 = mergeSort(arr2);
        }

        return _merge(arr1,arr2);
    }
};


module.exports = mergeSort;
