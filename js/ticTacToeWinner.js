"use strict";


// I think this works, didn't fully test
function check3(board, x, y, xIncrement, yIncrement) {
    let match = true;
    let curr = board[x][y];

    for (let i = 0; i < 2; i++) {
        x += xIncrement;
        y += yIncrement;

        const next = board[x][y];
        match = !match ? false : next && curr === next;
        curr = next;
    }

    if (match) {
        return board[x][y];
    }
}

function isWinner(board) {
    const horizontals = [0, 1, 2].map(currX => check3(board, currX, 0, 0, 1));
    const verticals = [0, 1, 2].map(currY => check3(board, 0, currY, 1, 0));
    const diagonal1 = check3(board, 0, 0, 1, 1);
    const diagonal2 = check3(board, 0, 2, 1, -1);

    return [...horizontals, ...verticals, diagonal1, diagonal2]
        .reduce((prev, curr) => prev || curr);
}

const board = [
    ['x', 'x', 'x'],
    ['o', 'o', null],
    [null, null, 'o'],
]

console.log('winner?', isWinner(board))

/**
 * TODO !!!!!!!!!!!! THIS IS NOT DONE IT DOESN'T WORK. !!!!!!!!!!!!!!!!!! 
 * I never accounted for vertical matches.
 */
// function isWinnerIncomplete(board) {

//     let diagonal1 = board[0][0];
//     let diagonal2 = board[2][2];

//     for (let y = 0; y < 3; y++) {

//         const arr = board[y];
//         let xMatch = arr[0];

//         for (let x = 0; x < 3; x++) {
//             const currCell = arr[x];

//             if (xMatch !== false) {
//                 xMatch = xMatch === currCell ? currCell : false;
//             }

//             if (x === y) {
//                 if (diagonal1 !== false) {
//                     diagonal1 = diagonal1 === currCell ? currCell : false;
//                 }
//             }
//             if (x === 2 - y) {
//                 if (diagonal2 !== false) {
//                     diagonal2 = diagonal2 === currCell ? currCell : false;
//                 }
//             }

//         }

//         if (xMatch !== false && xMatch !== null) {
//             return `${xMatch} wins`;
//         }

//     }

//     if (diagonal1 !== false && diagonal1 !== null) {
//         return `${diagonal1} wins`;
//     } else if (diagonal2 !== false && diagonal2 !== null) {
//         return `${diagonal2} wins`;
//     }
// }
