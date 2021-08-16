/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
 * The testcases will be generated such that the answer is unique.
 * A substring is a contiguous sequence of characters within the string.
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
     if (s.length < t.length) {
           return ''; 
     }
     const key = t.split('').reduce((acc, l) => {
          acc[l] = acc[l] ? acc[l] + 1 : 1;
          return acc; 
     }, {});
     
     const sArr  = s.split('');
     let currWindow;
     let seekUsed = false;

     function _seek(start, key) {
          let matched = 0;
          // if the current letter is not in the string, skip, because it can't be shortest 
          if (key[sArr[start]] === undefined) {
               return; 
          }
          seekUsed = true;
          for (let i = start; i < sArr.length; i++) {
               // once we hit the full number of matches, we can stop looking 
               if (key[sArr[i]] !== undefined && key[sArr[i]] > 0) {
                    --key[sArr[i]];
                    matched++;
               }
               if (matched === t.length) {
                    window = [start, i];
                    if (currWindow === undefined) {
                         currWindow = window;
                    } else if ((window[1] - window[0]) < (currWindow[1] - currWindow[0])) {
                         currWindow = window;
                    }
                    return;
               }
          }
     }

     // only loop until s.length - t.length - and more and you can't have a full window 
     for (let currX = 0; currX <= s.length - t.length; currX++) {
          _seek(currX, {...key});
          // if we're at the end of the string (within t.length), and we didn't find and answer
          // and also the current start is in the target srting...
          // that means that we did a search, and there are no matches, so stop looking! 
          if (seekUsed && currWindow === undefined)  {
               return ''; 
          }
     }

     if (currWindow === undefined) {
          return '';
     }
     return s.slice(currWindow[0], currWindow[1] + 1);
};

// console.log(minWindow('ADOBECODEBANC', 'ABC')); // "BANC"
console.log(minWindow('a', 'b')); // ""