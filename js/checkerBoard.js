"use strict";


const checkerBoardBad = function (units) {
    return new Array(units * units)
    .fill(0)
    .reduce((accumulator, curr, idx) => {
        let currArr = accumulator[accumulator.length - 1];
        if (idx % units === 0) {
            currArr = [];
            accumulator.push(currArr);
        }
        const isEvenRow = accumulator.length % 2 === 0;
        let square = idx % 2 === 0 ? 'x' : 'o';
        if (isEvenRow) {
            square = square === 'x' ? 'o' : 'x';
        }

        currArr.push(square);
        return accumulator;
    }, []);
}

// console.log(checkerBoardBad(6));


const checkerBoardNormal = function (units) {
    const board = [];
    for (let y = 0; y < units; y++) {
        const row = [];
        board.push(row);
        for (let x = 0; x < units; x++) {
            const square = (x + y) % 2 === 0 ? 'x' : 'o';
            row.push(square);
        }
    }
    return board;
}

// console.log(checkerBoardNormal(6));


function checkerBoardOneLoop (units) {
    let arr = [];
    let curr = true;
    const isOdd = units % 2 === 0;

    for (var i = 1; i <= (units * units); i++) {
        curr = !curr;
        arr.push(curr ? 'o' : 'x');
        if (i !== 0 && i % units === 0) {
            console.log(arr);
            arr = [];
            if (isOdd) {
                curr = !curr;
            }
        }
    }
}

// checkerBoardOneLoop(6);


// A very terse implementation, the precursor to the one line solution :
const checkerBoardTerse = function (units) {
    return new Array(units).fill(new Array(units)).map((arr, idx) => {
        return arr.fill(0).map((z, idx1) => (idx + idx1) % 2 === 0 ? 'x' : 'o')
    });
}

// console.log(checkerBoardTerse(7));


const checkerBoardOneLine = n => new Array(n).fill(0).map((o, idx) => new Array(n).fill(0).map((o, idx1) => (idx + idx1) % 2 === 0 ? 'x' : 'o'));

// console.log(checkerBoardOneLine(7));

// this optimized version of the problem avoids N^2 running time by creating the 2 possible rows up front and repeating them
// Running time is basically 2N
function checkerBoardOptimized(units) {
    const row1 = [];
    for (let i = 0; i < units; i++) {
        row1.push(i % 2 === 0 ? 'x' : 'o');
    }
    const row2 = row1.slice(1).concat(row1.slice(-1)[0] === 'x' ? 'o' : 'x');
    return row1.map((a, idx) => idx % 2 === 0 ? row1 : row2)

}

console.log(checkerBoardOptimized(6));
