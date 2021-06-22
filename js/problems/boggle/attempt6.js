const board = [
    ['x', 't', 'x', 'x'],
    ['c', 'a', 't', 'x'],
    ['x', 't', 'x', 'x'],
    ['x', 'a', 'c', 'x'],
];

// 12:07 - 1:00
function boggleMatches(board, str) {
    const arr = str.split('');
    const found = [];

    function _getPositions(position) {
        return [
            [position[0] - 1, position[1]],
            [position[0], position[1] + 1],
            [position[0], position[1] - 1],
            [position[0] + 1, position[1]]
        ]
    }

    function _recur(currPos, positionArr, letterArr) {
        const currLetter = board[currPos[0]] ? board[currPos[0]][currPos[1]] : undefined;
        console.log('checking', currPos, letterArr, currLetter)
        if (currLetter === letterArr[0]) {
            positionArr.push(currPos);
            const trimmedArr = letterArr.slice(1, letterArr.length);
            console.log('hit!!!', trimmedArr)
            if (trimmedArr.length === 0) {
                found.push(positionArr);
                return;
            } else {
                const positionsToCheck = _getPositions(currPos);
                console.log('what to chek', positionsToCheck)
                for (nextPos of positionsToCheck) {
                    _recur(nextPos, [...positionArr], trimmedArr)
                }
            }
        }
    }
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            let currPos = [i, j];
            _recur(currPos, [], arr);
        }
    }

    return found;
}


console.log('Boggle matches for CAT : ', boggleMatches(board, 'cat'));