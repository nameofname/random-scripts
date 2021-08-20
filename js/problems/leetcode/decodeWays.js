/**
 * Problem : 
 * A message containing letters from A-Z can be encoded into numbers using the following mapping:
 * 'A' -> "1"
 * 'B' -> "2"
 * ...
 * 'Z' -> "26"
 * To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:
 * "AAJF" with the grouping (1 1 10 6)
 * "KJF" with the grouping (11 10 6)
 * Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".
 * Given a string s containing only digits, return the number of ways to decode it.
 * The answer is guaranteed to fit in a 32-bit integer.
 * @param {string} s
 * @return {number}
 */
function numDecodings(s) {
    const arr = s.toString().split('');
    const accepted = new Array(26).fill(1).reduce((o, x, idx) => Object.assign(o, { [idx + 1]: true }), {});
    let decodings = {};
    let currNum;

    // seed the decodings object so that the while loop can function : 
    const firstNum = arr.shift();
    if (accepted[firstNum]) {
        decodings[firstNum] = 1;
    }
    
    while (currNum = arr.shift()) {
        const nextDecodings = {};
        Object.keys(decodings).forEach(key => {
            const count = decodings[key];
            const combinedKey = key + currNum;
            if (accepted[currNum]) {
                nextDecodings[currNum] = nextDecodings[currNum] ? nextDecodings[currNum] + count : count;
            }
            if (accepted[combinedKey]) {
                nextDecodings[combinedKey] = nextDecodings[combinedKey] ? nextDecodings[combinedKey] + count : count;
            }
        });
        decodings = nextDecodings;
    }

    return Object.values(decodings).reduce((acc, int) => {
        return acc + int;
    }, 0);
}

console.log(numDecodings(11106)); // 2, consisting of (11, 10, 6) & (1, 1, 10, 6)
console.log(numDecodings(12)); // 2
console.log(numDecodings('00'));
console.log(numDecodings('06'));
console.log(numDecodings(11111));
console.log(numDecodings(111111));
console.log(numDecodings("1111111111111111111111111111111111111"));
// 0, 06 --> no, no, shift,
// 6 --> yes, increment, shift 
// console.log(numDecodings("111111111111111111111111111111111111111111111")); // ?
