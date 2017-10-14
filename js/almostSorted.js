const processArr = (arr, callback) => {
    for (let idx = 0; idx < arr.length; idx++) {
        const curr = arr[idx];
        let prev = arr[idx - 1];
        let next = arr[idx + 1];
        prev = prev === undefined ? -Infinity : prev;
        next = next === undefined ? Infinity : next;
        callback(arr, prev, curr, next, idx);
    }
}

function findSwapReverse (a) {
    const arr = new Array(a.length).fill('').map((x, i) => a[i]);
    const arr1 = new Array(a.length).fill('').map((x, i) => a[i]);

    let swaps = 0;
    let toSwap = [];
    let toReverse = [];

    // explanation : figuring out the number of swaps is easy, but we have to actually do the swaps because as 
    // we go, if we swap 2 numbers, and the immediate next pair also needs to be swapped, then the swapped int
    // must be in the correct place 
    processArr(arr, (a, prev, curr, next, idx) => {
        if (next < curr) {
            if (next > prev) {
                ++swaps;
                toSwap = [idx + 1, idx + 2];
                a[idx] = next;
                a[idx + 1] = curr;
            } else {
                swaps = 100;
            }
        }
    });

    if (swaps <= 1) {
        return console.log(`yes\nswap ${toSwap.join(' ')}`);
    }

    // explanation : figuring out the number of reversals is a little trickier, we don't have to actually reverse
    // the array, because we just count the number of times the array is reversed and keep track. however, we 
    // must also account for the invalid case where there are 2 reversals (valid), that yeild an array that is 
    // still not sotred, eg, 1, 2, 6, 5, 3, 4 => 1, 2, 3, 5, 6, 4 -- here we reversed 6, 5, 3 but 4 is still out of place. 
    processArr(arr1, (a, prev, curr, next, idx) => {

        if (toReverse.length === 0) {
            if (next < curr) {
                toReverse.push(idx);
            }
        } else if (toReverse.length === 1) {
            if (next > curr) {
                toReverse.push(idx);
                if (next < a[toReverse[0]]) {
                    toReverse.push('whatever');
                }
            }
        }
    });

    if (toReverse.length <= 2) {
        return console.log(`yes\nreverse ${toReverse.map(n => n + 1).join(' ')}`);
    }

    return console.log(`no`);
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
    processData(_input);
});


