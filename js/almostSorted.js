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

function findSwapReverse (a) {
    const arr = new Array(a.length).fill('').map((x, i) => a[i]);
    const len = arr.length;
    const segments = [];
    // let direction = arr[0] < arr[1] ? "+" : "-";

    while (arr.length) {
        loop :
        for (let idx = 0; idx < arr.length; idx++) {
            const curr = arr[idx];
            const prev = arr[idx - 1];
            const next = arr[idx + 1];

            if (prev === undefined) {
                continue;
            }

            const negativeInflection = (prev <= curr) && (next < curr);
            const positiveInflection = (prev >= curr) && (next > curr);

            // console.log('test', positiveInflection, negativeInflection, prev, curr, next)
            if (positiveInflection || negativeInflection) {
                const splitOn = negativeInflection ? idx : idx + 1;
                segments.push(arr.splice(0, splitOn));
                break loop;
            } else if (next === undefined) {
                segments.push(arr.splice(0, arr.length));
            }
        }
    }

    if (segments.length > 3) {
        return console.log('no');
    }

    let negativeSegmentLength;
    let ordered = [];

    for (let j = 0; j < segments.length; j++) {
        const segment = segments[j];
        const isNegative = segment[1] < segment[0];
        let currSegment = segment;
        if (isNegative) {
            negativeSegmentLength = segment.length;
            currSegment = segment.reverse();
        }
        ordered = [...ordered, ...currSegment];
    }

    let orderCheck = ordered
        .reduce((prev, curr, idx) => {
            if (!prev) {
                return prev;
            }
            //console.log(curr <= ordered[idx + 1], curr, ordered[idx + 1])
            const next = ordered[idx + 1] === undefined ? Infinity : ordered[idx + 1];
            return curr <= next;
        }, true);


    if (!orderCheck) {
        return console.log('no');
    } else {
        if (negativeSegmentLength === 2) {
            return console.log(`yes\nswap${1}${2}`);
        } else {
            return console.log(`yes\nreverse${1}${2}`);
        }
    }









    return;

    if (directionChanges.length === 1) {
        return segments[0].length <= 2
            ? printSwap(directionChanges[0], len)
            : printReverse(directionChanges[0], len)
    } else if (directionChanges.length > 3) {
        return console.log('no');
    }

    let numOfDescending = 0;

    const reOrderedArr = segments
        .reduce((ar, segment, idx) => {

            const curr = segment[idx];
            const prev = segment[idx - 1] === undefined ? -Infinity : segment[idx - 1];
            const direction = (prev > curr) ? '-' : '+';
            console.log('testing prev > curr', prev > curr, prev, curr)
            if (direction === '-') {
                ++numOfDescending;
                segment = segment.reverse();
            }
            return [...ar, ...segment];
        }, []);

    console.log('numOfDescending', numOfDescending);
    if (numOfDescending > 1) {
        return console.log('no');
    }

    const isOrdered = reOrderedArr
        .reduce((result, curr, idx) => {
            if (!result) {
                return result;
            }
            const prev = idx === 0 ? -Infinity : reOrderedArr[idx - 1];
            return curr > prev;
        });

    console.log('isOrdered', isOrdered, reOrderedArr);
    if (isOrdered) {
        return printSwap(directionChanges[1] + 1, directionChanges[2]);
    } else {
        return console.log('no');
    }
}

function processData(input) {
    let [n, a] = _input.split("\n")
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
    //processData(_input);
});


findSwapReverse([1, 2, 3, 6, 5, 4, 7 ,8]);
findSwapReverse([3, 2, 1, 4, 5, 6]);

// [1, 2, 3, 6, 5, 4, 7 ,8]
// [3, 2, 1, 4, 5, 6]