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
    const directionChanges = [];

    for (let idx = 0; idx < arr.length; idx++) {
        // const prev = arr[idx - 1] === undefined ? -Infinity : arr[idx - 1];
        // const next = arr[idx + 1] === undefined ? Infinity : arr[idx + 1];
        // const prev = arr[idx - 1];
        const next = arr[idx + 1];
        const curr = arr[idx];

        if (next === undefined) {
            continue;
        }
        let currDirection;
        if (curr === next) {
            currDirection = direction;
        } else {
            currDirection = curr < next ? '+' : '-';
        }

        // console.log(curr, next, currDirection, direction);
        if (currDirection !== direction) {
            directionChanges.push([idx, currDirection]);
        }

        direction = currDirection;
    }

    // let mapDirection = directionChanges.shift();
    // const newArr = arr
    //     .map((int, idx) => {
    //
    //     });

    console.log(arr);
    return console.log(directionChanges);
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



