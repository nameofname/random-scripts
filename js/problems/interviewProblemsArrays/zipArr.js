// 12:39-12:41

function zipArrs(a1, a2) {
    const longest = Math.max(a1.length, a2.length),
        res = [];

    for (let i = 0; i < longest; i++) {
        if (a1[i] !== undefined) res.push(a1[i]);
        if (a2[i] !== undefined) res.push(a2[i]);
    }
    return res;
}

// console.log(zipArrs([1,2,3], ['a','b','c']));
// console.log(zipArrs([1,2,3], ['a','b','c','d']))

// 12:48 - 12:52 
function zipSorted(a1, a2) {
    const res = [];
    while (a1.length || a2.length) {
        const a = a1[0] === undefined ? Infinity : a1[0];
        const b = a2[0] === undefined ? Infinity : a2[0];
        if (a < b) res.push(a1.shift());
        else res.push(a2.shift());
    }
    return res;
}

console.log(zipSorted([1,2,3], [4,5,6]));
console.log(zipSorted([1,3,5], [2,4,6,7]));