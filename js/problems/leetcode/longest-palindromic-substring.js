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

