import test from './test.js';

const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

function boggleMatches(board, word) {
    const matches = [];

    function _seek(y, x, word, currMatch) {
        const nextLetter = word[0];
        if (!nextLetter) {
            return matches.push(currMatch);
        }
        const adjacentCells = [
            [y - 1, x],
            [y + 1, x],
            [y, x - 1],
            [y, x + 1],
        ];
        adjacentCells.forEach(([y1, x1]) => {
            const alreadyUsed = currMatch.reduce((a, c) => {
                return a || c[0] === y1 && c[1] === x1;
            }, false);
            if (!alreadyUsed && board[y1] && board[y1][x1] === nextLetter) {
                const newMatch = [...currMatch, [y1, x1]];
                _seek(y1, x1, word.substr(1, word.length), newMatch);
            }
        });
    }

    for (let y2 = 0; y2 < board.length; y2++) {
        for (let x2 = 0; x2 < board.length; x2++) {
            _seek(y2, x2, word, []);
        }
    }

    return matches;
}

test(board, 'cat', boggleMatches(board, 'cat'));