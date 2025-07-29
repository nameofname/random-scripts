const { plot } = require('nodeplotlib');

/**
 * Remember off the top of my head how to do merge sort...
 */
function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    }
    let a1 = arr.slice(0, Math.floor(arr.length / 2));
    let a2 = arr.slice(Math.floor(arr.length / 2), arr.length);
    if (a1.length > 1) {
        a1 = mergeSort(a1);
    }
    if (a2.length > 1) { 
        a2 = mergeSort(a2);
    }
    return _zip(a1, a2);
}

let itars = 0;
function _zip(a1, a2) {
    let l = 0, r = 0;
    let out = [];
    while (l < a1.length || r < a2.length) {
        // console.log('go again', l, r, a1, a2)
        if (a2[r] === undefined || a1[l] <= a2[r]) {
            out.push(a1[l]);
            l++;
        } else {
            out.push(a2[r]);
            r++;
        }
        ++itars;
    }
    return out;
}

function getRandArray(n) {
    return new Array(n).fill(0).map((v, i) => {
        return Math.floor(Math.random() * n);
    });
}

// let unsorted = [1, 2, 3, 8, 7, 5, 6, 0, 7, 9, 8, 2, 7, 4, 5, 8, 1, 2, 6, 5];
// console.log(unsorted.length);
// console.log(mergeSort(unsorted));
// console.log(mergeSort(unsorted).length);
// console.log('itars', itars);


/**
 * Performance test : 
 * As predicted, this has linear performance
 */

const data = [
  {
    x: [],
    y: [],
    type: 'scatter',
  },
];

for (let i = 5; i < 100; i++) {
    const unsorted = getRandArray(i);
    itars = 0;
    mergeSort(unsorted);
    data[0].x.push(i);
    data[0] .y.push(itars);
}

console.log(data)

plot(data);
