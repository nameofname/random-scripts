function seek(board, wordArr, matches, x, y) {
    const nextLetter = wordArr[0];
    const currLetter = board[y] && board[y][x];
    const isMatch = currLetter === nextLetter;

    if (wordArr.length === 1 && isMatch) {
        return ++matches;

    } else if (isMatch) {
        const substr = wordArr.slice(1, wordArr.length) 
        const up = [y - 1, x];
        const right = [y, x + 1];
        const down = [y + 1, x];
        const left = [y, x - 1];
        const allCoords = [up, right, down, left];

        for (let i = 0; i < 4; i++) {
            const coords = allCoords[i];
            const [y1, x1] = coords;
            const letter = board[y1] ? board[y1][x1] : undefined;

            if (letter !== undefined) {
                matches = seek(board, substr, matches, x1, y1);
            }
        }
    }

    return matches;
}

function boggleMatches(board, word) {
    let matches = 0;
    wordArr = word.split('');

    board.forEach((row, y) => {
        row.forEach((letter, x) => {
            const newMatches = seek(board, wordArr, 0, x, y);
            matches += newMatches;
        });
    });

    return matches;
}

const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];


console.log('Found boggle matches for CAT : ', boggleMatches(board, 'cat'));