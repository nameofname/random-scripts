// looks like it's faster to check from the boarder in
// if the 'O' group is part of the boarder then don't flip
function solve(board) {
    const visited = {};
    // from 'O' on the edge do DFS
    // everything else gets flipped to 'X'
    function _visit(y, x) {
        const key = `${y}-${x}`;
        if (
            board[y]
            && board[y][x]
            && board[y][x].toLowerCase() === 'o'
            && !visited[key]
        ) {
            visited[key] = true;
            [
                [y - 1, x],
                [y + 1, x],
                [y, x - 1],
                [y, x + 1]
            ].forEach(([y1, x1]) => _visit(y1, x1));
        }
    }

    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (
                y === 0
                || x === 0
                || y === board.length - 1
                || x === board[0].length - 1
            ) {
                _visit(y, x);
            }
        });
    });

    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            const key = `${y}-${x}`;
            if (!visited[key]) {
                row[x] = 'X';
            }
        });
    });

    return board;
}






function solve_slow(board) {
    let area = {};
    let should = true;

    function _shouldFlip([y, x]) {
        const key = `${y}-${x}`;
        // if we already encountered a boarder,
        // or already saw this cell, 
        // or the current cell is not an 'O'
        // ... stop looking
        if (
            !should
            || area[key] === true
            || (board[y] && board[y][x] && board[y][x].toLowerCase() === 'x')
        ) {
            return should;
        }
        // check current cell :
        if (
            x === 0
            || y === 0
            || y === board.length - 1
            || x === board[0].length - 1
        ) {
            should = false;
        } else {
            area[key] = true;
        }
        // check adjacent cells :
        [
            [y, x - 1], 
            [y, x + 1], 
            [y - 1, x], 
            [y + 1, x], 
        ].forEach((arr) => {
            _shouldFlip(arr);
        });

        return should;
    }

    function _flip() {
        for (bla in area) {
            const [y, x] = bla.split('-').map(Number)
            board[y][x] = 'X';
        }
        _reset();
    }

    function _reset() {
        area = [];
        should = true;
    }

    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell.toLowerCase() === 'o') {
                if (_shouldFlip([y, x])) {
                    _flip(area);
                } else {
                    _reset();
                }
            }
        });
    });

    return board;
};

const exampleInput = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
console.log(solve(exampleInput));