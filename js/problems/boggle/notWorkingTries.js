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