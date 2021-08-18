const {a, b} = require('./longStrings.json');
const { benchmark } = require('../../helpers/benchmark');

/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
 * The testcases will be generated such that the answer is unique.
 * A substring is a contiguous sequence of characters within the string.
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
     // special case for if the needle is longer than the haystack :
     if (s.length < t.length) {
           return ''; 
     }

     const tKey = t.split('').reduce((acc, l) => {
          acc[l] = acc[l] ? acc[l] + 1 : 1;
          return acc; 
     }, {});

     const sArr  = s.split('');
     const required = Object.keys(tKey).length;
     const windowKey = {};
     let left = 0, right = 0, completed = 0, smallestWindow;

     while (right < s.length) {
          // check the current character
          // if it's in the target string, then count it
          const char = sArr[right];
          if (tKey[char] !== undefined) {
               windowKey[char] = (windowKey[char] || 0) + 1;
               if (windowKey[char] === tKey[char]) {
                    console.log('incrementing completed with ', char)
                    ++completed;
               }
          }

          // console.log('right', right)
          // now move the left pointer to the right
          // record the smallest window as you go
          while (left <= (right - t.length + 1) && completed === required) {
               console.log('checking ... ', 'smallestWindow', smallestWindow, 'substring', s.slice(left, right + 1))
               if (smallestWindow !== undefined) {
                    console.log('CHIECKING....', (right - left), ([1] - smallestWindow[0]))
               }
               if ((smallestWindow === undefined) || (right - left) < (smallestWindow[1] - smallestWindow[0])) {
                    smallestWindow = [left, right];
                    console.log('ITS A HIT!', smallestWindow)
               }
               ++left;
               const leftChar = sArr[left - 1];
               if (tKey[leftChar]) {
                    windowKey[leftChar] = (windowKey[leftChar] || 0) - 1;
                    if (windowKey[leftChar] === tKey[leftChar] - 1) {
                         --completed;
                         console.log('DECREMENTING completed with ', char)
                    }
               }
               // console.log('left', left)
          }

          // move the right pointer to the right
          // it'll get checked again at the top of the loop
          ++right;
     }

     if (smallestWindow === undefined) {
          return '';
     }

     return s.slice(smallestWindow[0], smallestWindow[1] + 1);
};

// console.log(minWindow('ADOBECODEBANC', 'ABC')); // "BANC"
console.log(minWindow('bba', 'ab'));
// console.log(minWindow(a, b));
// console.log(benchmark(() => minWindow('ADOBECODEBANC', 'ABC'), 55));
// console.log(benchmark(() => minWindow(a, b), 1));