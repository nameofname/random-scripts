// find the longest substring with no repeating characters
// ie. abcdabcd would be 4
// note* this is very common, but not identical to 
// the LCS problem : https://www.cs.cmu.edu/~avrim/451f09/lectures/lect1001.pdf

function lengthOfLongestSubstring(str) {
    const arr = str.split('');
    let substr = [];
    let longest = 0;
    arr.forEach(char => {
        const indexOf = substr.indexOf(char);
        if (indexOf !== -1) {
            substr = substr.slice(indexOf + 1, substr.length);
        }
        substr.push(char);
        longest = substr.length > longest ? substr.length : longest;
    });
    return longest;
}


console.log('longest', lengthOfLongestSubstring('abcdabc'));


console.log('Test 1: ', lengthOfLongestSubstring('abcabcbb') === 3);
console.log('Test 2: ', lengthOfLongestSubstring('cccccc') === 1);
console.log('Test 3: ', lengthOfLongestSubstring('rsskes') === 3);
console.log('Test 4: ', lengthOfLongestSubstring('cccd') === 2);
console.log('Test 6: ', lengthOfLongestSubstring('qrstrstqa') === 5);
console.log('Test 5: ', lengthOfLongestSubstring('abcdbae') === 5);
