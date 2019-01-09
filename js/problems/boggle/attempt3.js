const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

function boggleMatches(word, board) {

    const matches = [];

    function _seek(points, wordArr) {
        const point = points.slice(-1)[0];
        const [ x, y ] = point;
        const letter = wordArr[0];
        const currLetter = board[x] && board[x][y];

        if (currLetter !== letter) {
            return;
        }

        if (wordArr.length === 1) {
            matches.push(points);
            return;
        }
        const adjacentPoints = [ [ x - 1, y ], [ x + 1, y ], [ x, y - 1 ], [ x, y + 1 ] ];
        adjacentPoints.forEach(([ adjacentX, adjacentY ]) => {
            const substr = wordArr.length === 1 ? [] : wordArr.slice(-1 * (wordArr.length - 1));
            if (board[adjacentX] && board[adjacentX][adjacentY]) {
                _seek([...points, [adjacentX, adjacentY]], substr);
            }
        });
    }

    const wordArr = word.split('');
    board.forEach((row, x) => {
        row.forEach((letter, y) => {
            _seek([[x, y]], wordArr);
        });
    });

    return matches;
}

console.log('Found boggle matches for CAT : ', boggleMatches('cat', board));