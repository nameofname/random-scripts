// https://leetcode.com/problems/excel-sheet-column-number/

function titleToNumber(str) {
    const codeMap = new Array(26).fill(65)
        .map((v, idx) => v + idx)
        .reduce((a, c) => Object.assign(a, {
            [String.fromCharCode(c)]: c - 64
        }), {});

    let res = 0;
    const letters = str.split('');
    for (let i = 0; i < str.length; i++) {
        const factor = Math.pow(26, i);
        res += codeMap[letters.pop()] * factor;
    }
    return res;
}

console.log(titleToNumber('A'));
console.log(titleToNumber('C'));
console.log(titleToNumber('Z'));
console.log(titleToNumber('AB'));
console.log(titleToNumber('ZY'));
console.log(titleToNumber('AAA'));
console.log(titleToNumber("FXSHRXW")); // 2147483647 - not 8239