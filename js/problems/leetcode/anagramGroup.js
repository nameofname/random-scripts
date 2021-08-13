/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    const map = new Map();
    for (str of strs) {
        const sorted = str.split('').sort().join('');
        let currVal = map.get(sorted) || [];
        map.set(sorted, [ ...currVal, str]);
    }
    return Array.from(map.values());
};

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))