/**
 * Given an array of positive integers nums and an integer k, find the length of
 * the longest contiguous subarray whose sum is less than or equal to k.
 * Input: nums = [2, 1, 3, 2, 1, 4], k = 7
 * Output: 4
 * Explanation: The subarray [1,3,2,1] (sum = 7) has the maximum length under the constraint.
 */

// 31 Minutes! 

function findSubArray(a, k) {
    let l = 0,
        r = 0,
        longest = 0,
        sum = a[0];
    while (l < a.length - 1) {
        console.log('checking', l, r, sum)
        if (sum <= k) {
            longest = Math.max(longest, (r - l + 1)); // add 1 so that the substr length is inclusive
            if (r < a.length - 1) {
                r++;
                sum += a[r];
            } else {
                sum -= a[l];
                l++;
            }
        } else {
            sum -= a[l];
            l++;
            while (sum > k) {
                sum -= a[r];
                r--;
            }
        }
    }
    return longest;
}

const res = findSubArray([2, 1, 3, 2, 1, 4],  7);
const isCorrect = res === 4;
console.log('Is it correct?', res, isCorrect)