/**
 * This problem is slightly more complicated than you would initially think
 * Because parts of the string can repeat, you have to look behind instead of blindly going forward
 * For example, 1213 ... you would get to the 2nd 1 and discard 12, but you need to keep 2
 * ... making the lonest substring 213 instead of 13
 * My initial approach to this was to have 1 pointer moving forward 
 * Then to store the last known location of each character
 * And when I get to a repeated character, reset the pointer back to the last encountered location
 * There is a more performant solution however, instead of setting the pointer back 
 * you maintain a lft and right pointer.
 * The right pointer keeps advancing, but each time you encounter a duplicate characer
 * you set the left pointer to it's last known loocation 
 */

// This is my solution which resets the pointer : 
var lengthOfLongestSubstring_bak = function(s) {
    const sArr = s.split('');
    let letterMap = {};
    let p = 0; // pointer
    let curr = 0;
    let longest = 0;
    while (p < sArr.length) {
        // console.log(p, sArr[p])
        if (!Number.isInteger(letterMap[sArr[p]])) {
            letterMap[sArr[p]] = p;
            ++curr;
        } else {
            longest = curr > longest ? curr : longest;
            curr = 0;
            // reset the pointer to the last time it was at the current character
            p = letterMap[sArr[p]];
            letterMap = {};
        }
        ++p;
    }
    return longest > curr ? longest : curr;
};

/**
 * THIS ONE DOES NOT WORK
 * Working on the window based solution...
 * I find that trying to mess around too much with charAt and indexOf is very difficult
 * beause string length is not 0 based, but indexes are - like arrays
 * in this case, moving the left pointer to the right is hard enough to calculate mentally...
 * ... that I don't recommend coding window based solutions this way
 * let's try another approach where i maintain the substring as the current window. 
 */
var lengthOfLongestSubstring_attempt = function(s) {
    let longest = 0;
    let l=0, r=1;
    let substring;
    while (r < s.length) {
        substring = s.substring(l, r);
        const lastOccurrence = substring.indexOf(s.charAt(r - 1));
        console.log('substring', l, r, s.charAt(r - 1), lastOccurrence, substring.length, substring);
        if (lastOccurrence !== -1 && lastOccurrence !== substring.length - 1) {
            l = substring.indexOf(s.charAt(r - 1)) + 1;
            console.log('hit', substring, l, r, s.charAt(r - 1));
        } else {
            // console.log('longest??', substring)
            longest = substring.length > longest ? substring.length : longest;
        }
        r++;
    }
    return substring.length > longest ? substring.length : longest;
};


/**
 * Wow holy shit look how terse this solution is!
 * And the running time is fucking amazing. Wow.
 * This took me like all day to work on, which is bad...
 * but I think that now I have my preferred method for coding window based solutions! 
 * Which is, instead of maintaining a left pointer, you maintain the window, 
 * and every time you want to move the left side in, you just chop off the left hand side of your window
 */
var lengthOfLongestSubstring = function(s) {
    let longest = 0;
    let r=0;
    let ss = '';
    while (r < s.length) {
        longest = ss.length > longest ? ss.length : longest;
        const char = s.charAt(r);
        if (ss.includes(char)) {
            ss = ss.substring(ss.indexOf(char) + 1, ss.length);
        }
        ss += char;
        r++;
    }
    return ss.length > longest ? ss.length : longest;
};





console.log(lengthOfLongestSubstring('abcabcbb'))
// console.log(lengthOfLongestSubstring('bbbbb'))
// console.log(lengthOfLongestSubstring('pwwkew'))
// console.log(lengthOfLongestSubstring("aab"))
// console.log(lengthOfLongestSubstring("dvdf"))
// console.log(lengthOfLongestSubstring("abcdedcba"))
console.log(lengthOfLongestSubstring("12345367890")) // 45367890 (length of 8)