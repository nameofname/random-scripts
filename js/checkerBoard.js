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

console.log(checkerBoard(7));

