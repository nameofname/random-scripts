const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

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

const matches = boggleMatches('cat', board);
console.log('Found boggle matches for CAT : ', matches);
// console.log(matches[0]);

// TODO ! 
// break the current implementation with a word that has 2 consecutive letters like 'caat'
// because after it finds A it will look for A, and since it considers the spot it just
// did in the last pass, it will get into an infinite loop ? no it won't. it will look for T
// next, and not continue. Really the bug is that if you allow the algorithm to consider
// the same position more than once for a given word then you can get a positive result for
// a word like 'aaaaaaa' with just 2 'a's next to each other. 

// TODO ! 
// have the algorithm return a tree for performance, then create a reader that will give you
// every array back from the tree. That would be fun. Fun.