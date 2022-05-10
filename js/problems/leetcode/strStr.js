/**
 * https://leetcode.com/problems/implement-strstr/submissions/
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
 function strStr(haystack, needle) {
    if (!needle.length) {
        return 0;
    }
    for (let i = 0; i < haystack.length - needle.length + 1; i++) {
        const letter = haystack[i];
        if (letter === needle[0]) {
            for (let j = 0; j < needle.length; j++) {
                const innerLetter = needle[j];
                if (haystack[i + j] !== innerLetter) {
                    break;
                } else if (j === needle.length - 1) {
                    return i;
                }
            }
        }
    }
    return -1;
};