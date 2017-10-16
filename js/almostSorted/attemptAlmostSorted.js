const processArr = (arr, callback) => {
    for (let idx = 0; idx < arr.length; idx++) {
        const curr = arr[idx];
        let prev = arr[idx - 1];
        let next = arr[idx + 1];
        // prev = prev === undefined ? -Infinity : prev;
        // next = next === undefined ? Infinity : next;
        callback(prev, curr, next, idx);
    }
};

function printSwap(n1, n2) {
    return console.log(`yes\nswap ${n1} ${n2}`);
}
function printReverse(n1, n2) {
    return console.log(`yes\nreverse ${n1} ${n2}`);
}

const checkOrder = ordered => ordered
    .reduce((prev, curr, idx) => {
        if (!prev) {
            return prev;
        }
        //console.log(curr <= ordered[idx + 1], curr, ordered[idx + 1])
        const next = ordered[idx + 1] === undefined ? Infinity : ordered[idx + 1];
        return curr <= next;
    }, true);



function findSwapReverse (a) {
    const arr = new Array(a.length).fill('').map((x, i) => Number(a[i]));
    // const arrCopy = new Array(a.length).fill('').map((x, i) => Number(a[i]));
    let direction;
    const segments = [[]];
    const singleUnorderedIndicies = [];

    // to find your inflection points, you have to consider how you would re-arrange the numbers in your array
    // for an inflection switching to negative, you always want to include the current index, whereas if it's switching
    // to positive, you don't want the current index in the segment. Consider the following cases :
    // 1 2 3 6 5 4
    // 3 2 1 4 5 6
    // in both cases you want to split the into 2 halves, but for 1 2 3 6 - this is all in order, however 6 switches to
    // negative so we want that included in the 2nd segment.
    // that's based on the next entry, not the previous one.
    // RULES :
    // if the current direction is positive, and the next number is less than, then this is the start of
    // a negative segment
    // else if the current direction is negative and the next number is greater than, then this is the end of
    // a negative segment

    // to further illustrate, consider this standard case of a reversed segment :
    // 1 2 3 6 5 4 7 8 9

    // in the case where you have a single number out of order, then this logic does not hold :
    // 1 2 3 9 5 6 7 8 4
    // by that logic the segments here would be : (+)[1 2 3]  (-)[9 5]  (+)[6 7]  (-)[8 4]
    // therefore, as we check for positive and negative segments, we must also check for single integers out of order
    // that is where the current number is either greater or less than both surrounding numbers

    for (let idx = 0; idx < arr.length; idx++) {
        const prev = arr[idx - 1] === undefined ? -Infinity : arr[idx - 1];
        const next = arr[idx + 1] === undefined ? Infinity : arr[idx + 1];
        const curr = arr[idx];

        // first check for a single index out of order :
        const isUnorderedGreater = curr >= prev && curr > next;
        const isUnorderedLess = curr <= prev && curr < next;
        if (isUnorderedGreater || isUnorderedLess) {
            singleUnorderedIndicies.push(idx);
        }

        // next build up the segments by splitting on the conditions described above :
        // if (next === Infinity) {
        //     continue;
        // }

        let directionChange;

        // if unordered greater, then this is a negative inflection point, the start of a negative segment : [1 2] [6 5 4]
        if (isUnorderedGreater) {
            directionChange = '-';
            segments.push([]);
        }

        segments[segments.length - 1].push(arr[idx]);

        // if unordered less, then the next index is the start of a positive segment :
        if (isUnorderedLess) {
            segments.push([]);
        }
    }

    console.log(arr);
    console.log(singleUnorderedIndicies);
    return console.log(segments);
}

function processData(input) {
    let [n, a] = _input.split("\n");
    a = a.split(' ');
    return findSwapReverse(a);
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});


// [1, 2, 3, 6, 5, 4, 7 ,8]
// [3, 2, 1, 4, 5, 6]

// findSwapReverse([1, 2, 3, 6, 5, 4, 7 ,8]);
// findSwapReverse([3, 2, 1, 4, 5, 6]);
// findSwapReverse([3, 1, 2]);
// findSwapReverse([1, 5, 4, 3, 2, 6]);



