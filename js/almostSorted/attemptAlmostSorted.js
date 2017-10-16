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
    let segments = [[]];
    const singleUnordered = [];

    if (checkOrder(a)) {
        return console.log('yes');
    } else if (a.length === 2) {
        return console.log('yes\nswap 1 2');
    }

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

    // NOTE* For this case to work, you have to check that the number is out of order with regards to numbers 2 deep
    // on either side, take this example :
    // 1 2 3 7 5 6
    // bot 7 and 5 are unordered with regards to 2 immediately surrounding numbers, so we check 2 back and 2 forward

    for (let idx = 0; idx < arr.length; idx++) {
        const prev = arr[idx - 1] === undefined ? -Infinity : arr[idx - 1];
        const next = arr[idx + 1] === undefined ? Infinity : arr[idx + 1];
        const curr = arr[idx];

        const isUnorderedGreater = curr >= prev && curr > next;
        const isUnorderedLess = curr <= prev && curr < next;

        // first check for a single index out of order :
        if (isUnorderedGreater || isUnorderedLess) {
            const prev1 = arr[idx - 2] === undefined ? -Infinity : arr[idx - 2];
            const next1 = arr[idx + 2] === undefined ? Infinity : arr[idx + 2];
            const isDoubleUnorderedGreater = isUnorderedGreater && curr >= prev1 && curr >= next1;
            const isDoubleUnorderedLess = isUnorderedLess && curr <= prev1 && curr <= next1;
            if (isDoubleUnorderedGreater || isDoubleUnorderedLess) {
                singleUnordered.push(idx);
            }
        }

        // if unordered greater, then this is a negative inflection point, the start of a negative segment : [1 2] [6 5 4]
        if (isUnorderedGreater) {
            segments.push([]);
        }

        segments[segments.length - 1].push(arr[idx]);

        // if unordered less, then the next index is the start of a positive segment :
        if (isUnorderedLess) {
            segments.push([]);
        }
    }

    segments = segments.filter(seg => seg.length);

    // first case is if there are exactly 4 unordered indicies, this could happen in a swap case : 1 2 6 4 5 3 7
    if (singleUnordered.length === 2) {

        // check that the swap is successful
        const prev1 = arr[singleUnordered[0] - 1] !== undefined ? arr[singleUnordered[0] - 1] : -Infinity;
        const next1 = arr[singleUnordered[0] + 1] !== undefined ? arr[singleUnordered[0] + 1] : Infinity;
        if (arr[singleUnordered[0]] >= prev1 && arr[singleUnordered[0]] <= next1) {
            if (arr[singleUnordered[1]] >= prev2 && arr[singleUnordered[1]] <= next2) {
                return console.log(`yes\nswap ${singleUnordered[0] + 1} ${singleUnordered[1] + 1}`);
            }
        }
    }

    let numNegatives = 0;
    const segmentsWithDirections = segments.map(segment => {
        let direction;
        let counter = 0;
        while (direction === undefined && counter <= segment.length) {
            counter++;
            const positive = segment[counter] < segment[counter + 1];
            const negative = segment[counter] > segment[counter + 1];
            if (positive || negative) {
                direction = positive ? '+' : '-';
            }
        }
        numNegatives = direction === '-' ? ++numNegatives : numNegatives;
        return {direction, segment};
    });

    // second possible success case is where we have 3 or fewer segments where one is reversed :
    if (segments.length <= 3 && numNegatives === 1) {
        let reverseIndicies = [];
        let reverseSegmentLength;
        const ordered = segmentsWithDirections
            .reduce((ord, {direction, segment}, idx) => {
                if (direction === '-') {
                    reverseIndicies = [ord.length + 1, ord.length + segment.length];
                    reverseSegmentLength = segment.length;
                    return [...ord, ...segment.reverse()];
                } else {
                    return [...ord, ...segment];
                }
            }, []);
        const orderedCheck = checkOrder(ordered);
        // console.log('for this reverse job, lets check our work : ', ordered);
        // console.log('for this reverse job, lets check our work : ', orderedCheck);
        // console.log(arr);
        if (orderedCheck && reverseSegmentLength === 2) {
            return console.log(`yes\nswap ${reverseIndicies.join(' ')}`);
        } else if (orderedCheck) {
            return console.log(`yes\nreverse ${reverseIndicies.join(' ')}`);
        }
    }

    // console.log(arr);
    // console.log(singleUnordered);
    // console.log(segments);
    return console.log('no');
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



