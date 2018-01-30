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

checkerBoardOneLoop(3);
checkerBoardOneLoop(6);
// console.log(checkerBoardNormal(7));

/**
 * My favorite implementation - certainly the most terse implementation.
 * @param {*} units 
 */
const checkerBoard = function (units) {
    return new Array(units).fill(new Array(units)).map((arr, idx) => {
        return arr.fill(0).map((z, idx1) => (idx + idx1) % 2 === 0 ? 'x' : 'o')
    });
}

// console.log(checkerBoard(7));


// function checkerBoardOneLine(n) { return new Array(n).fill(1).map((i, idx) => { return new Array(n).fill(1).map((j, idx1) => { return (idx + idx1) % 2 === 0 ? 'x' : 'o' }) }); }

const checkerBoardOneLine = n => new Array(n).fill(0).map((o, idx) => new Array(n).fill(0).map((o, idx1) => (idx + idx1) % 2 === 0 ? 'x' : 'o'));

