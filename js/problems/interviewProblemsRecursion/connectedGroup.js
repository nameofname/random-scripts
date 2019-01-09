const matrix = [
    ['x', 'o', 'x', 'o'],
    ['o', 'o', 'x', 'o'],
    ['x', 'o', 'o', 'x'],
    ['x', 'o', 'x', 'x'],
];

// Find all connect groups of the letter 'o' in the above matrix.
// In this case there should be 2 such groups.
function connectedGroup(searchValue, matrix) {
    const groups = [];
    const used = {};

    function _getGroup(newPoint, pointGroup) {
        const [ x, y ] = newPoint;
        const currValue = matrix[x] && matrix[x][y];

        let alreadyUsed = used[`${x}-${y}`];
        // if the current point has already been considered, do nothign
        if (alreadyUsed || currValue === undefined) {
            return pointGroup;
        }
        used[`${x}-${y}`] = true;        

        // check whether the current value matches the search value
        // if so then add it to the group and recurse over the siblings
        if (currValue === searchValue) {
            pointGroup.push(newPoint);
            const adjacentPoints = [ [ x - 1, y ], [ x + 1, y ], [ x, y - 1 ], [ x, y + 1 ] ];
            adjacentPoints.forEach(newPoint => {
                _getGroup(newPoint, pointGroup);
            });
        }

        return pointGroup;
    }

    matrix.forEach((row, x) => {
        row.forEach((value, y) => {
            const group = _getGroup([ x, y ], []);
            if (group.length) {
                groups.push(group);
            }
        });
    });

    return groups;
}

console.log('Found points in connected group : ', connectedGroup('o', matrix));