/**
 * This is my first solution. The hard problem here is that there are 2 basic cases you have to account for, 
 * the palindrome has odd or even number of letters. 
 * eg. abbbc vs abbbbc
 * To solve for this, I used 2 right hand pointers and tested for both. 
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let l, r, r1, sub = '';
    for (let i = 0; i < s.length; i++) {
        l = i;
        r = i;
        r1 = i + 1;
        while ((s[l] === s[r]) || s[l] === s[r1]) {
            if (s[l] === s[r1]) {
                sub = sub.length > s.substring(l, r1 + 1).length ? sub : s.substring(l, r1 + 1);
            } else {
                r1 = s.length;
            }
            if (s[l] === s[r]) {
                sub = sub.length > s.substring(l, r + 1).length ? sub : s.substring(l, r + 1);
            } else {
                r = s.length;
            }
            --l; 
            ++r;
            ++r1;
            if (s[l] === undefined) {
                break;
            }
        }
    }
    return sub;
};

// console.log(longestPalindrome('abbbbc'));
// console.log(longestPalindrome('abbbc'));
// console.log(longestPalindrome('babad'));
// console.log(longestPalindrome('b'));
console.log(longestPalindrome("gyyvvy")); // yvvy

/**
 * Here is my answer from a year later. 
 * This one was not so good... Took a long time, and getting the left and right variables correct was very time consuming
 * I'm taking lessons from this on being careful about zero based indexing, usage of .slice()
 * Instead of just using an inner while loop on this one I used a closure
 * IDK if that was the right choice... I can clearly see though that in my old answer there were fewer while loops
 * ... which I achieved by simply using 2 right pointeres, and checking each in the same while loop. 
 * That was definitely better.
 */
var longestPalindrome = function(s) {
    let palindrome = s.slice(0, 1);

    function _getPalindromeAt(substr, i) {
        let currPalindrome = substr;
        let right = i;
        let left = right - substr.length + 1;
        // console.log('_getPalindromeAt', left, right, substr);
        if ((right + 1) < (s.length / 2)) {
            nearestEdge = right;
        }
        whileLoop:
        while (++right < s.length && --left >= 0) {
            if (s[right] === s[left]) {
                // console.log('re-evaluate', left, right, s.slice(left, right + 1));
                currPalindrome = s.slice(left, right + 1);
            } else {
                break whileLoop;
            }
        }
        if (currPalindrome.length > palindrome.length) {
            palindrome = currPalindrome;
        }
    }

    for (let i = 1; i < s.length; i++) {
        // console.log('000', i, s[i], s[i-1], s[i-2])
        if (s[i] === s[i - 2]) {
            // console.log('111', i - 2, i, s.slice(i - 2, i + 1));
            _getPalindromeAt(s.slice(i - 2, i + 1), i);
        }
        if (s[i] === s[i - 1]) {
            // console.log('222', i - 1, i, s.slice(i - 1, i + 1));
            _getPalindromeAt(s.slice(i - 1, i + 1), i);
        }
    }
    return palindrome;
}
