const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

// Same solution as attempt 3, but honed.
function boggleMatches(word, board) {
    const matches = [];

    function _seek(points, wordArr) {
        const [ x, y ] = points.slice(-1)[0];
        const currLetter = board[x] && board[x][y];
        const seekingLetter = wordArr[0];

        if (currLetter === seekingLetter) {
            if (wordArr.length === 1) {
                matches.push(points);
                return;
            }

            const adjacentPoints = [ [ x - 1, y ], [ x + 1, y ], [ x, y - 1 ], [ x, y + 1 ] ];
            const substr = wordArr.slice(-1 * (wordArr.length - 1));
            adjacentPoints.forEach(newPoint => {
                _seek([...points, newPoint], substr);
            });
        }
    }

    board.forEach((row, x) => {
        row.forEach((letter, y) => {
            _seek([[x, y]], word.split(''));
        });
    });

    return matches;
}

console.log('Found boggle matches for CAT : ', boggleMatches('cat', board));