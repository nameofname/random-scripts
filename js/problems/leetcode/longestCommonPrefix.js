/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
    const prefix = strs.shift().split('');
    for (word of strs) {
        let i = 0;
        while (i <= prefix.length && word[i] === prefix[i]) {
            i++;
        }
        prefix.splice(i, prefix.length);
    }
    return prefix.join('');
};

console.log(longestCommonPrefix(["flower","flow","flight"])); // fl
console.log(longestCommonPrefix(["ab", "a"])); // a