const { plot } = require('nodeplotlib');
const timer = require('../helpers/timer');

/**
 * Remember off the top of my head how to do merge sort...
 * Notes : 
 * - I found that doing some basic tweaks to the code had a decent 
 * sized impact on the growth line for my performance test
 *      Especially doing fewer array accesses
 * - The n*log(n) curve looks kind of like a straight line, I always thought
 * it was supposed to taper, but no, I just don't know math
 *      It actually is the opposite, instead of tapering it has a slight
 *      upward curve, but it is so slight it barely matters
 */
function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    }
    const h = Math.floor(arr.length / 2);
    let a1 = arr.slice(0, h);
    let a2 = arr.slice(h, arr.length);
    if (a1.length > 1) {
        a1 = mergeSort(a1);
    }
    if (a2.length > 1) {
        a2 = mergeSort(a2);
    }
    return _zip(a1, a2);
}


function _zip(a1, a2) {
    let l = 0, r = 0;
    const out = [], len = a1.length + a2.length;

    for (let i = 0; i < len; i++) {
        const left = a1[l];
        const right = a2[r];
        if (left === undefined) {
            out[i] = right;
            r++;
        } else if (right === undefined) {
            out[i] = left;
            l++;
        } else {
            if (left <= right) {
                out[i] = left;
                l++;
            } else {
                out[i] = right;
                r++;
            }
        }
    }
    return out;
}


function getRandArray(n) {
    return new Array(n).fill(0).map((v, i) => {
        return Math.floor(Math.random() * n);
    });
}

/**
 * Performance test : 
 * As predicted, this has linear performance
 */
function checkPerf(mergeSortImpl) {
    const data = [
        {
            x: [],
            y: [],
            type: 'scatter',
        },
    ];

    for (let i = 5000; i < 100000; i += 1000) {
        const unsorted = getRandArray(i);
        itars = 0;
        const time = timer(() => mergeSortImpl(unsorted));
        data[0].x.push(i);
        data[0].y.push(time);
    }

    console.log(data)
    plot(data);
}

/**
 * Comparing my 
 */
function jsSort(arr) {
    return arr.sort((a, b) => {
        if (a < b) return -1;
        else if (b < a) return 1;
        else return 0;
    });
}

/**
 * Show that n*log(n) is ALMOST a straight line
 */
function graphNLogN() {
    const data = [
        {
            x: [],
            y: [],
            type: 'scatter',
        },
    ];

    for (let i = 5000; i < 1000000; i += 1000) {
        data[0].x.push(i);
        data[0].y.push((i * Math.log(i)));
    }

    console.log(data)
    plot(data);
}


checkPerf(mergeSort);
// console.log(jsSort(getRandArray(20)));
