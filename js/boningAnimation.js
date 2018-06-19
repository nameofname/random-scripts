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

let int = 0;
let direction = 1;
let started = false;


function doit() {

    if (fuckingArr[int]) {
        setTimeout(() => {
            process.stdout.write('\x1Bc')
            console.log(fuckingArr[int]);
            if (int + 1 === fuckingArr.length || (int === 0 && started)) {
                direction = direction * -1;
            }
            int+= direction;  
            started = started || true;
            doit();
        }, 100);
    }
}

doit();
