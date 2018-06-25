const fuckingArr = [
    ' 8=====> ({})',
    '  8=====>({})',
    '   8=====>{})',
    '    8=====>})',
    '     8=====})',
    '      8====})',
    '       8===})',
    '        8==})',
    '         8=})',
    '        8==})',
    '       8===})',
    '      8====})',
    '     8=====})',
    '    8=====>})',
    '   8=====>{})',
    '  8=====>({})',
];

const completionArr = [
    '8=====>~ ({})',
    '8=====>~~({})',
    '8=====> ~~{})',
    '8=====>  ~~})',
    '8=====>  (~})',
    '8=====>  ({})',
];

let fuckingRuns = 0;
let completionRuns = 0;

function write(arr) {
    process.stdout.write('\x1Bc');
    console.log(arr[0]);
    arr.push(arr.shift());
}

function doit() {
    setTimeout(() => {
        write(fuckingArr);
        ++fuckingRuns;
        return (fuckingRuns > 4 * fuckingArr.length) ? completion() : doit(); 
    }, 100);
}

function completion() {
    setTimeout(() => {
        write(completionArr);
        ++completionRuns;
        if (completionRuns < 4 * completionArr.length) {
            completion();
        }
    }, 100);
}

doit();
