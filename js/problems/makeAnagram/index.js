const letterToNumber = new Array(26)
    .fill(0)
    .map((zed, idx) => String.fromCharCode(65 + idx))
    .reduce((obj, curr, idx) => Object.assign(obj, {[curr]: idx}), {})

// console.log(oneArr)
// console.log(twoArr)
function makeAnagram(s1, s2) {
    const oneArr = s1.split('').map(char => letterToNumber[char.toUpperCase()]).sort(((a, b) => a < b ? -1 : 1));
    const twoArr = s2.split('').map(char => letterToNumber[char.toUpperCase()]).sort(((a, b) => a < b ? -1 : 1));

    const len = oneArr.length > twoArr.length ? oneArr.length : twoArr.length;
    const removals = [];
    let x = 0;
    
    while (x < oneArr.length || x < twoArr.length) {
        const charA = oneArr[x] === undefined ? 99 : oneArr[x];
        const charB = twoArr[x] === undefined ? 99 : twoArr[x];
        if (charA !== charB) {
            const toSplice = charA < charB ? oneArr : twoArr;
            removals.push(...toSplice.splice(x, 1));
        } else {
            x++;
        }
    }

    return removals.length;
}

console.log(makeAnagram('rondo', 'ornddrrrrz'));

// console.log(letterToNumber);
