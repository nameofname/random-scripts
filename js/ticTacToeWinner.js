"use strict";

/**
 * TODO !!!!!!!!!!!! THIS IS NOT DONE IT DOESN'T WORK. !!!!!!!!!!!!!!!!!! 
 * I never accounted for vertical matches.
 */
function isWinner(board) {

    let diagonal1 = board[0][0];
    let diagonal2 = board[2][2];

    for (let y = 0; y < 3; y++) {

        const arr = board[y];
        let xMatch = arr[0];

        for (let x = 0; x < 3; x++) {
            const currCell = arr[x];

            if (xMatch !== false) {
                xMatch = xMatch === currCell ? currCell : false;
            }

            if (x === y) {
                if (diagonal1 !== false) {
                    diagonal1 = diagonal1 === currCell ? currCell : false;
                }
            }
            if (x === 2 - y) {
                if (diagonal2 !== false) {
                    diagonal2 = diagonal2 === currCell ? currCell : false;
                }
            }

        }

        if (xMatch !== false && xMatch !== null) {
            return `${xMatch} wins`;
        }

    }

    if (diagonal1 !== false && diagonal1 !== null) {
        return `${diagonal1} wins`;
    } else if (diagonal2 !== false && diagonal2 !== null) {
        return `${diagonal2} wins`;
    }
}