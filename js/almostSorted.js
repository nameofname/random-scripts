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
    const segments = [];

    while (arr.length) {
        loop :
        for (let idx = 0; idx < arr.length; idx++) {
            const curr = arr[idx];
            const prev = arr[idx - 1];
            const next = arr[idx + 1];

            let negativeInflection = (prev <= curr) && (next < curr);
            let positiveInflection = (prev >= curr) && (next > curr);

            if (prev === undefined) {
                negativeInflection = false;
                positiveInflection = false;
            }

            // console.log('test', positiveInflection, negativeInflection, prev, curr, next);
            if (positiveInflection || negativeInflection) {
                const splitOn = negativeInflection ? idx : idx + 1;
                segments.push(arr.splice(0, splitOn));
                // inflections.push(splitOn);
                break loop;
            } else if (next === undefined) {
                segments.push(arr.splice(0, arr.length));
            }
        }
    }

    console.log('segments', segments);

    if (segments.length > 3) {
        return console.log('no');
    }

    let negativeSegmentLength;
    let ordered = [];
    const inflections = [];

    for (let j = 0; j < segments.length; j++) {
        const segment = segments[j];
        const isNegative = segment[1] < segment[0];
        let currSegment = segment;
        inflections.push(ordered.length);
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
        const keyWord = (negativeSegmentLength === 2) ? 'swap' : 'reverse';
        // console.log(a);
        return console.log(`yes\n${keyWord} ${inflections.join(' ')}`);
    }
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
    //processData(_input);
});


// [1, 2, 3, 6, 5, 4, 7 ,8]
// [3, 2, 1, 4, 5, 6]
findSwapReverse([1, 2, 3, 6, 5, 4, 7 ,8]);
findSwapReverse([3, 2, 1, 4, 5, 6]);
findSwapReverse([3, 1, 2]);
findSwapReverse([1, 5, 4, 3, 2, 6]);
