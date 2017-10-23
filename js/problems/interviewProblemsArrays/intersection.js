"use strict";

const arr1 = [2, 2, 4, 1];
const arr2 = [1, 2, 0, 2];

const intersection = (a1, a2) => {
    // choose the shorter array to make a hashmap of
    const shorter = a1.length < a2.length ? a1 : a2;
    const longer = shorter === a1 ? a2 : a1;
    const map = shorter.reduce((o, int) => (Object.assign(o, { [int]: true })), {});

    // using the map, and a new map for what was re-used, reduce to an array of integers in both arrays :
    // the alternate solution is to have the first map store a counter instead of a boolean. 
    const used = {};
    return longer.reduce((arr, int) => {
        if (!used[int] && map[int]) {
            arr = [int, ...arr];
        }
        used[int] = true;
        return arr;
    }, []);
};

console.log(intersection(arr1, arr2)); // [2, 1]
