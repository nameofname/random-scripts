const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

// Same solution as attempt 3, but honed.
function boggleMatches(word, board) {
    const wordArr = word.split('');
    const out = [];

    function _seekWords(position, currArr, idx) {
        const [ x, y ] = position;
        const seekLetter = wordArr[idx];
        const currLetter = board[y][x];
        if (currLetter !== seekLetter) {
            return;
        }
        
        currArr = [...currArr, position]
        if (currArr.length === wordArr.length) {
            return out.push(currArr);
        }

        const siblings = [ [ x - 1, y ], [ x + 1, y ], [ x, y - 1 ], [ x, y + 1 ]];
        siblings.forEach(newPosition => {
            const [ x1, y1 ] = newPosition;
            const letterAtNewPosition = board[y1] && board[y1][x1];
            if (letterAtNewPosition !== undefined) {
                _seekWords(newPosition, currArr, idx + 1);
            }
        });
    }

    board.forEach(( row, y ) => {
        row.forEach(( letter, x ) => {
            _seekWords([ x, y ], [], 0);
        });
    });

    return out;
}

console.log('Found boggle matches for CAT : ', boggleMatches('cat', board));