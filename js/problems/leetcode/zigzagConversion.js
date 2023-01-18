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
