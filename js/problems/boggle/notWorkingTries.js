const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

function _checkSiblings(position, nextLetter, board) {
    const [ x, y ] = position;
    const siblings = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    return siblings.reduce((hits, [ x1, y1 ]) => {
        if (board[x1][y1] === nextLetter) {
            hits.push([x1, y1]);
        }
        return hits;
    }, []);
}

function _seek(wordArr, matches, board) {
    const newMatches = [];

    matches.forEach(coordinateArr => {
        matchingSiblings = _checkSiblings(coordinateArr[coordinateArr.length - 1], wordArr[coordinateArr.length - 1], board);
        matchingSiblings.forEach(coordinate => {
            newMatches.push([...coordinateArr, coordinate]);
        });
    });

    console.log('newMatches', newMatches)
    if (!newMatches.length || newMatches[0].length === wordArr.length) {
        return newMatches;
    }

    console.log('seek it')
    return _seek(wordArr, newMatches, board);
}

function boggleMatches(word, board) {
    const wordArr = word.split('');
    return _seek(wordArr, [], board);
}

console.log('Found boggle matches for CAT : ', boggleMatches('cat', board));


// ----------------------------------------------------------------------

/**
 * This guy does not work, but it's a good approach and should be fixed.
 */
function _seek(points, wordArr, board, matches) {
    const point = points.slice(-1)[0];
    const [ x, y ] = point;
    const letter = wordArr[0];
    const currLetter = board[x] && board[x][y];

    if (wordArr.length === 1 && letter === currLetter) {
        // console.log('this case', matches)
        matches.push(points);
        return matches;
    }

    // if (letter === currLetter) {
        const adjacentPoints = [ [ x - 1, y ], [ x + 1, y ], [ x, y - 1 ], [ x, y + 1 ] ];
        // console.log('adjacentPoints, ', adjacentPoints)
        return adjacentPoints.map(adjacentPoint => {
            if (board[adjacentPoint[0]] && board[adjacentPoint[0]][adjacentPoint[1]]) {
                const substr = wordArr.slice(1, wordArr.length);
                const pointsNew = [...points, adjacentPoint];
                return _seek(pointsNew, substr, board, matches);
            }
        });
    // }
}

function boggleMatches_bak(word, board) {
    const wordArr = word.split('');
    const matches = [];
    board.forEach((row, x) => {
        row.forEach((letter, y) => {
            const newMatches = _seek([[x, y]], wordArr, board, []);
            if (newMatches) matches.concat(newMatches);
        });
    });
    return matches;
}


// ----------------------------------------------------------------------


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