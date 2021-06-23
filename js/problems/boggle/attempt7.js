const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

// 6:32 - 6:56 ... DOESN'T WORK! 
// Came back later, fixed for ~15 minutes...
// Looks the same as my last approach! I guess I've done this thing enough.
function boggleMatches(board, str) {
    const matches = [];
    const strArr = str.split('');

    function _getPositionsToCheck(pos) {
        return [
            [pos[0], pos[1] - 1],
            [pos[0], pos[1] + 1],
            [pos[0] - 1, pos[1]],
            [pos[0] + 1, pos[1]],
        ];
    }

    function findWords(pos, currMatch) {
        const currLetter = board[pos[1]] && board[pos[1]][pos[0]];
        if (currLetter === strArr[currMatch.length]) {
            // in this case, it's a hit, check first if full match
            const newMatch = [...currMatch, pos];
            if (newMatch.length === strArr.length) {
                matches.push(newMatch);
                return;
            }
            const positionsToCheck = _getPositionsToCheck(pos);
            for (newPos of positionsToCheck) {
                findWords(newPos, newMatch);
            }
        }
    }

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            const pos = [x, y];
            findWords(pos, []);
        }
    }
    return matches;
}


console.log('Boggle matches for CAT : ', boggleMatches(board, 'cat'));