// I HAVE NOT FIGURED OUT A WORKING SOLUTION TO THIS!!!!!! 
// I HAVE NOT FIGURED OUT A WORKING SOLUTION TO THIS!!!!!! 
// I HAVE NOT FIGURED OUT A WORKING SOLUTION TO THIS!!!!!! 
// I HAVE NOT FIGURED OUT A WORKING SOLUTION TO THIS!!!!!! 
const sumArr = arr => arr.reduce((num, curr) => num + curr, 0);
const roundedAverage = arr => Math.round(sumArr(arr) / arr.length);

function formingMagicSquare(s) {
    const rowSums = [];
    const colSums = [];
    let matrixTotal = 0;

    s.forEach((arr, idx) => {
        let rowSum = 0;
        arr.forEach((int, idx1) => {
            rowSum += int;
            matrixTotal += int;
            colSums[idx1] = colSums[idx1] === undefined ? 0 : colSums[idx1];
            colSums[idx1] += int;
        });
        rowSums.push(rowSum);
    });

    const magicNumber = roundedAverage(rowSums);
    return { magicNumber, matrixTotal, difference: matrixTotal - (magicNumber * 3) };
    // const rowShifts = rowSums.reduce((total, curr) => total + Math.abs(magicNumber - curr), 0);
    // const colShifts = colSums.reduce((total, curr) => total + Math.abs(magicNumber - curr), 0);

    // const rowShifts = rowSums.map(curr => magicNumber - curr);
    // const colShifts = colSums.map(curr => magicNumber - curr);

    // // return (rowShifts - colShifts) + colShifts;
    // return {magicNumber, rowShifts, colShifts};
}


const input1 = [ // 4
    [4, 8, 2],
    [4, 5, 7],
    [6, 1, 6],
];

const input2 = [ // 1
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 5]
];

const input3 = [ // ???
    [3, 9, 1],
    [5, 8, 9],
    [1, 9, 9]
];

console.log(formingMagicSquare(input1));
// console.log(formingMagicSquare(input2));


// input 1, magicNumber = 14

//          0    0   -1
//       _______________
//  0   |   4    8    2
//      |
// -2   |   4    5    7
//      |
//  1   |   6    1    6


//          0    0    0
//       _______________
//  0   |   4    8    2
//      |
//  0   |   4    5    5(-2)
//      |
//  0   |   6    1    7(+1)

