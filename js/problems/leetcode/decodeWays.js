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
    let combos = 0;
    const arr = s.toString().split('');
    const accepted = new Array(26).fill(1).reduce((o, x, idx) => Object.assign(o, { [idx + 1]: true }), {});

    let count = 0;

    function _seek(lastNum, remainder) {
        if (!remainder.length) {
            return;
        }
        const suffix = remainder[0];
        const combined = lastNum + suffix;
        if (!accepted[combined] && !accepted[suffix]) {
            --count;
        } else if (accepted[combined] && accepted[suffix]) {
            ++count;
        }
        if (accepted[combined]) {
            _seek(combined, remainder.slice(1, remainder.length));
        }
        if (accepted[suffix]) {
            _seek(suffix, remainder.slice(1, remainder.length));
        }
    }

    if (accepted[arr[0]]) {
        ++count;
    }
    _seek(arr.shift(), arr);

    return count;


    // the following has terrible peformance. 
    function _seek_bak(curr, remainder) {
        if (!remainder.length) {
            ++combos;
        } else {
            const nexts = [remainder.slice(0, 1)];
            if (remainder.length > 1) {
                nexts.push(remainder.slice(0, 2))
            }
            nexts.forEach(next => {
                if (accepted[next.join('')]) {
                    _seek([...curr, next.join('')], remainder.slice(next.length, arr.length));
                }
            })
        }
    }

    _seek([], arr);
    return combos;
};

console.log(numDecodings(11106));
console.log(numDecodings('00'));
// console.log(numDecodings(11111));
// console.log(numDecodings("1111111111111111111111111111111111111"));
console.log(numDecodings('06'));
// 0, 06 --> no, no, shift,
// 6 --> yes, increment, shift 
// console.log(numDecodings(12)); // 2
// console.log(numDecodings("111111111111111111111111111111111111111111111")); // ?
