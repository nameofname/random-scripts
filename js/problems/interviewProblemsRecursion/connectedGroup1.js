const matrix = [
    ['x', 'o', 'x', 'o'],
    ['o', 'o', 'x', 'o'],
    ['x', 'o', 'o', 'x'],
    ['x', 'o', 'x', 'x'],
];

function connectedGroup(searchValue, matrix) {
    const groups = [];
    const usedMap = {};

    function _seek(point, group) {
        const [ x, y ] = point;
        const currValue = matrix[x] && matrix[x][y];
        const siblings = [ [ x - 1, y ], [ x + 1, y ], [ x, y - 1 ], [ x, y + 1 ] ];

        if (!usedMap[`${x}-${y}`] && currValue === searchValue) {
            group.push(point);
            usedMap[`${x}-${y}`] = true;
            siblings.forEach(newPoint => {
                _seek(newPoint, group);
            });
        }

        return group;
    }

    matrix.forEach((row, x) => {
        row.forEach((entry, y) => {
            const group = _seek([ x, y ], []);
            if (group.length) {
                groups.push(group);
            }
        });
    });

    return groups;
}

console.log('Found points in connected group : ', connectedGroup('o', matrix));