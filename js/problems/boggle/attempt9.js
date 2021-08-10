const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

// 3:01 - 3:17 (but i was interupted by a call! so probably would have been ~10 minutes!)
function boggleMatches(board, word) {
    const matches = [];
    word = word.split('');

    function _seek(curr, idx1, idx2) {
        if (Array.isArray(board[idx1]) && board[idx1][idx2] === word[curr.length] && word[curr.length] !== undefined) {
            console.log(board[idx1][idx2], word[curr.length])
            curr.push([idx1, idx2]);
            if (curr.length === word.length) {
                matches.push(curr);
            } else {
                const adjacent = [
                    [idx1, idx2 + 1],
                    [idx1, idx2 - 1],
                    [idx1 + 1, idx2],
                    [idx1 - 1, idx2],    
                ];
                adjacent.forEach(([a, b]) => {
                    _seek([...curr], a, b);
                });
            }
        }
    }

    board.forEach((row, idx1) => {
        row.forEach((letter, idx2) => {
            _seek([], idx1, idx2);
        });
    });

    return matches;
}



console.log('Found boggle matches for CAT : ', boggleMatches(board, 'cat'));