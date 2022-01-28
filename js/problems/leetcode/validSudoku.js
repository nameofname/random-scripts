/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    const rows = {};
    const cols = {};
    const boxes = {};
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            let element = board[row][col];
            if (element === '.') {
                continue;
            }
            if (1 > element || element > 9) {
                console.log('haterz 1')
                return false;
            }
            const box = Math.floor((row + 1) / 3) * 3 + (Math.floor((col + 1) / 3)) - 1;
            rows[row] = rows[row] || {};
            cols[col] = cols[col] || {};
            boxes[box] = boxes[box] || {};
            if (rows[row][element] || cols[col][element] || boxes[box][element]) {
                console.log('haterz', row, col, box)
                console.log('elems', element, rows[row], cols[col], boxes[box])
                return false;
            }
            rows[row][element] = true;
            cols[col][element] = true;
            boxes[box][element] = true;
        }
    }

    // return true;
    return {rows, cols, boxes};
};
const board1 = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]];

const board2 =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]];

const board3 = 
[[".",".","5",".",".",".",".",".","6"],
[".",".",".",".","1","4",".",".","."],
[".",".",".",".",".",".",".",".","."],
[".",".",".",".",".","9","2",".","."],
["5",".",".",".",".","2",".",".","."],
[".",".",".",".",".",".",".","3","."],
[".",".",".","5","4",".",".",".","."],
["3",".",".",".",".",".","4","2","."],
[".",".",".","2","7",".","6",".","."]];

console.log(isValidSudoku(board1)); // true
// console.log(isValidSudoku(board2)); // false
// console.log(isValidSudoku(board3)); // true