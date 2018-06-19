const fuckingArr = [
    '8=====> ({})',
    ' 8=====>({})',
    '  8=====>{})',
    '   8=====>})',
    '    8=====})',
    '     8====})',
    '      8===})',
    '       8==})',
    '        8=})',
];

const completionArr = [
    '8=====>~ ({})',
    '8=====>~~({})',
    '8=====> ~~{})',
    '8=====>  ~~})',
    '8=====>  (~})',
    '8=====>  ({})',
];
let int = 0;
let runs = 0;
let direction = 1;
let started = false;


function doit(callback) {

    if (fuckingArr[int]) {
        setTimeout(() => {
            process.stdout.write('\x1Bc')
            console.log(fuckingArr[int]);
            if (int + 1 === fuckingArr.length || (int === 0 && started)) {
                direction = direction * -1;
                runs++;
            }
            int+= direction;  
            started = started || true;
            if (runs > 7) {
                int = 0;
                callback();
            } else {
                doit(callback);
            }
        }, 100);
    }
}

function completion() {

    setTimeout(() => {
        process.stdout.write('\x1Bc')
        console.log(completionArr[int]);
        if (int + 1 === completionArr.length) {
            int = 0;
            runs++;
        }
        int++;
        if (runs < 16) {
            completion();
        }
    }, 100);
}

doit(completion);
