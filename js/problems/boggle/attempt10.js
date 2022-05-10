const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

// 11:05 - 11:19
function boggleMatches(board, word) {
    const matches = [];
    function _find(positions) {
        if (positions.length === word.length) {
            matches.push(positions);
            return;
        }
        const [ x, y ] = positions.slice(-1)[0];
        [
            [x, y + 1],
            [x, y - 1],
            [x + 1, y],
            [x - 1, y],
        ].forEach(newPosition => {
            // console.log('newPosition', newPosition, word[positions.length])
            const [y1, x1] = newPosition;
            if (board[y1] && board[y1][x1] === word[positions.length]) {
                _find([...positions, newPosition]);
            }
        });
    }
    board.forEach((arr, yPos) => {
        arr.forEach((letter, xPos) => {
            // console.log(letter, xPos, yPos, board[yPos][xPos])
            if (letter === word[0]) {
                _find([[xPos, yPos]]);
            }
        });
    })
    return matches;
}

console.log('Found boggle matches for CAT : ', boggleMatches(board, 'cat'));