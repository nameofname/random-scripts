const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

// 7:36
function boggleMatches(board, word) {
    const wordArr = word.split('');
    let matched = 0;
    const boardCopy = new Array(board.length)
    .fill(
        new Array(board[0].length)
        .fill(false)
    );

    function _step(y, x, depth) {
        if (
            boardCopy[y]
            && boardCopy[y][x] === false 
            && board[y][x] === wordArr[depth]
        ) {
            matched++;
            boardCopy[y][x] = true;
            if (matched !== wordArr.length) {
                [
                    [y - 1, x],
                    [y + 1, x],
                    [y, x - 1],
                    [y, x + 1],
                ].forEach(([y1, x1]) => _step(y1, x1, depth + 1))
            }
        }
    }

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[0].length; x++) {
            matched = 0;
            _step(y, x, 0);
            if (matched === wordArr.length) return true;
        }
    }

    return false;
}

console.log('Found boggle matches for CAT : ', boggleMatches(board, 'cat'));