const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

// 11:44 - 12:02 
// because i fat fingered a few things and it took like 15 mniutes to debug... but i got the gist really quick.
// see all the console statements... fuck this, i don't care. 
function boggleMatches(board, word) {
    const matches = [];
    word = word.split('');
    function _seek(wordArr, row, index) {
        // first check the current position
        // console.log('sup', wordArr, row, index)
        if (Array.isArray(board[row]) && word[wordArr.length] === board[row][index]) {
            wordArr.push([row, index]);
            // it's a hit! 
            // console.log(wordArr.length, word.length, wordArr.length === word.length)
            if (wordArr.length === word.length) {
                // console.log('HIT', wordArr, row, index)
                matches.push(wordArr);
            // else keep going... 
            } else {
                // console.log('NOT A HIT', wordArr, word, wordArr.length, word.length)
                const positions = [
                    [row, index - 1],
                    [row, index + 1],
                    [row - 1, index],
                    [row + 1, index]
                ]
                positions.forEach(position => {
                    // clone the array, or else the recurser won't branch 
                    _seek([...wordArr], position[0], position[1]);
                });
            }
        }
    }
    board.forEach((row, r) => {
        row.forEach((letter, i) => {
            _seek([], r, i);
        });
    });
    return matches;
}

/**
 * Initial notes : 
 * ok so you have a function
 * internal array of matches
 * each time you raech the length of the string you add to hte internal array
 * the recurser has to take in the current letter you are on
 * or wait no, just the current word you are building
 * and the current position in the board
 * important whether you use x, y or y, x... how about row, index! that's nice 
 * ok, let's go
 */

/**
 * Notes on completion : 
 * now that i have done this a few times ... a couple things stand out. 
 * i routinely get the following things wrong : 
 *      - first i always forget to clone the array before passing back in
 *          - this is a classic pitfall of recursion, 
 *          if the same array is being mutated on different passes 
 *          then the recursing function won't branch correctly
 *      - second, and this one is more important, i alwasy stack the function upside down
 *          - it's most intuitive to think of creaing all of the adjacent positions
 *          to check, then systematically checking them, however this leads
 *          to the problem that you are never checking the first position passed in
 *          the smart way to do this is to have the recursing function check the current spot
 *          then if it's a hit, check the adjacent spots by passing back through the recursive function 
 */


// 11:15 - 11:38
function boggleMatches_bak(board, word) {
    const matches = [];
    word = word.split('');
    function _seek(wordArr, row, index) {
        if (Array.isArray(board[row]) && board[row][index] === word[wordArr.length]) {
            wordArr.push([row, index]);
            if (wordArr.length === word.length) {
                matches.push(wordArr);
            } else {
                const positionsToCheck = [
                    [row, index - 1],
                    [row, index + 1],
                    [row - 1, index],
                    [row + 1, index],
                ];
                positionsToCheck.forEach(pos => {
                    _seek([...wordArr], pos[0], pos[1]);
                });
            }
        }
    }
    for (let row = 0; row < board.length; row++) {
        for (let idx = 0; idx < board[0].length; idx++) {
            _seek([], row, idx)
        }
    }
    return matches;
}



console.log('Found boggle matches for CAT : ', boggleMatches(board, 'cat'));