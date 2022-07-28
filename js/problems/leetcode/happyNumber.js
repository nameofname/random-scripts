// https://leetcode.com/problems/happy-number/
function isHappy(n) {
    let curr = n;
    const m = new Map();
    while(!m.has(curr)) {
        m.set(curr, true);
        curr = String(curr).split('').reduce((a, c) => a + Math.pow(Number(c), 2), 0);
        // console.log(curr)
        if (curr === 1) return true;
    }
    return false;
}

console.log(isHappy(6));