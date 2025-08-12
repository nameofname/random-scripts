/**
 * https://leetcode.com/problems/roman-to-integer/
 * @param {string} s
 * @return {number}
 */
const valueMap = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000,
};
var romanToInt = function (s) {
    let n = 0;
    for (let i = 0; i < s.length; i++) {
        const val = valueMap[s[i]];
        if (s[i + 1] && valueMap[s[i + 1]] > val) {
            n += val * -1;
        } else {
            n += val;
        }
    }
    return n;
}