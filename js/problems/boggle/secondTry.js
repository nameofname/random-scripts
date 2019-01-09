const boggleBoard = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

function _seek(wordArr, board, matches) {

    // stop recursion :
    const len = matches[0] && matches[0].length;
    if (wordArr.length === len) {
        return matches;
    }

    const newMatches = [];

    matches.forEach(coordinateArr => {
        const lastCoordinate = coordinateArr[coordinateArr.length - 1];
        const [ x, y ] = lastCoordinate;
        const nextLetter = wordArr[coordinateArr.length];

        for (let x1 = -1; x1 <= 1; x1++) {
            for (let y1 = -1; y1 <= 1; y1++) {
                if (!(x1 === 0 && y1 === 0)) {
                    const checkX = x + x1;
                    const checkY = y + y1;
                    if (board[checkX] && board[checkX][checkY] === nextLetter) {
                        const newMatch = [...coordinateArr, [checkX, checkY]];
                        newMatches.push(newMatch);
                    }
                }
            }
        }
    });

    return _seek(wordArr, board, newMatches);
}

function findBoggleWords(word, board) {
    const wordArr = word.split('');
    let matches = [];

    board.forEach((row, xPos) => {
        row.forEach((letter, yPos) => {
            if (letter === word[0]) {
                matches.push([[xPos, yPos]]);
            }
        });
    });

    return _seek(wordArr, board, matches);
}

console.log('find boggle words', findBoggleWords('cat', boggleBoard));