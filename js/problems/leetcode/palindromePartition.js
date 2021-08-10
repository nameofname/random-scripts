/**
 * @param {string} s
 * @return {number}
 */
function minCut (s) {

    const coords = [];

    function findPalindromes(s) {
        const arr = s.split('');
        let left;
        let right;

        arr.forEach((l, idx) => {
            left = right = 0;
            if (arr[idx + 1] === l) {
                left = idx; 
                right = idx + 1;
            } else {
                left = right = idx; 
            }
            while((left >= 0) && (right <= arr.length - 1) && (arr[left - 1] === arr[right + 1])) {
                left--;
                right++;
            }
            if ((right - left) >= 1) {
                coords.push([left, right]);
            }
        });
    }

    findPalindromes(s);
    return coords;
};


console.log(minCut('aab'));
// console.log(minCut('ron drive racecar theht ronor'));
console.log(minCut('cocdorodcoccocdorod'));
