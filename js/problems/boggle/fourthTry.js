const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

function _seek(points, wordArr, board) {
    const point = points.slice(-1)[0];
    // console.log('point', point)
    const [ x, y ] = point;
    const letter = wordArr[0];
    const currLetter = board[x] && board[x][y];

    if (wordArr.length === 0) {
        return point;
    }

    if (letter === currLetter) {
        const adjacentPoints = [ [ x - 1, y ], [ x + 1, y ], [ x, y - 1 ], [ x, y + 1 ] ];
        return adjacentPoints.map(adjacentPoint => {
            if (board[adjacentPoint[0]] && board[adjacentPoint[0]][adjacentPoint[1]]) {
                const substr = wordArr.slice(1, wordArr.length);
                const pointsNew = [...points, adjacentPoint];
                return _seek(pointsNew, substr, board);
            }
        });
    } else {
        return false;
    }
}

function boggleMatches(word, board) {
    const wordArr = word.split('');
    const matches = [];
    board.forEach((row, x) => {
        row.forEach((letter, y) => {
            const newMatches = _seek([[x, y]], wordArr, board);
            if (newMatches) matches.push(newMatches);
        });
    });
    return matches;
}

console.log('Found boggle matches for CAT : ', boggleMatches('cat', board));