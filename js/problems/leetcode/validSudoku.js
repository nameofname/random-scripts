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
            // console.log(element);
            if (element === '.') {
                continue;
            }
            if (1 > element || element > 9) {
                return false;
            }
            const box = Math.floor(row / 3) * 3 + (Math.ceil(col / 3));
            // console.log('row', row, 'col', col, 'box', box)
            rows[row] = rows[row] || {};
            cols[col] = cols[col] || {};
            boxes[box] = boxes[box] || {};
            if (rows[row][element] || cols[col][element] || boxes[box][element]) {
                return false;
            }
            rows[row][element] = true;
            cols[col][element] = true;
            boxes[box][element] = true;
        }
    }

    return true;
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

console.log(isValidSudoku(board1)); // true
console.log(isValidSudoku(board2)); // false