function convert(s, numRows) {
    if (numRows === 1) return s;
    let out = [];
    const mx = new Array(numRows).fill(1).map(a => []);
    let direction = -1, level = 0;

    for (letter of s) {
        mx[level].push(letter);
        if (level === numRows - 1 || level === 0) {
            direction = direction * -1;
        }
        level += direction;
    }
    for (row of mx) {
        for (l of row) out.push(l);
    }
    return out.join('');
}

// console.log(convert('PAYPALISHIRING', 4));
console.log(convert('AB', 1));


/**
 * Another solution from a year later... this one was not so bad because 
 * I did the solution in like 5 minutes, great. On the downside I took a look
 * at the old solution, and an accepted solution with better performance and I 
 * can see that I didn't need the left pad at all, totally unnecessary in this situation. 
 * Oh well, do more and faster. 
 */
var convert = function(s, numRows) {
    if (numRows === 1) {
        return s;
    }
    const mx = new Array(numRows).fill([]);
    let direction = 'down';
    let currX = 0;
    let currY = -1;
    for (let i = 0; i < s.length; i++) {
        if (direction === 'down') {
            currY += 1;
        } else {
            currX += 1;
            currY -= 1;
        }
        const leftPad = currX - mx[currY].length;
        mx[currY] = [...mx[currY], ...new Array(leftPad).fill(''), s[i]];
        if (direction === 'down' && currY === numRows - 1) {
            direction = 'up';
        } else if (direction === 'up' && currY === 0) {
            direction = 'down'
        }
    }
    return mx.map(arr => arr.join('')).join('');
};