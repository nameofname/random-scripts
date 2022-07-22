// https://leetcode.com/problems/find-peak-element/
// the trick with this one is that they're asking you to do it in log(n) time
// so here's the thing, what i would do is binary search for it
// however, in the worst case, it's still going to take N time
// there's just no scenario i can think of where you don't have to visit every node in the worst case

function findPeakElement(nums) {
    if (nums.length === 1) return 0;
    let found;

    function _check(idx) {
        // console.log('checking', idx)
        const l = idx - 1 === -1 ? -Infinity : nums[idx - 1];
        const r = idx + 1 === nums.length ? -Infinity : nums[idx + 1];
        if (l < nums[idx] && nums[idx] > r) {
            return idx;
        }
    }

    function _binary(l, r) {
        if (r < l) return;
        const m = l + Math.floor((r - l) / 2);
        if (found === undefined) {
            found = _check(m);
            // console.log('going on', '(', l, m-1, ')', '(', m + 1, r, ')')
            _binary(l, m - 1);
            _binary(m + 1, r);
        }
    }

    _binary(0, nums.length - 1);
    return found;
}

// console.log(findPeakElement([1,2,3,1]));
// console.log(findPeakElement([1,2,1,3,5,6,4]));
// console.log(findPeakElement([
//     8, 9,  8, 8, 10,  9,  6, 9, 6,  6,  7,
//     6, 9,  8, 7, 10,  7, 10, 9, 9,  9, 10,
//    10, 6, 10, 9,  9,  7,  7, 6, 6,  7,  8,
//     8, 9,  7, 7,  8, 10,  8, 9, 9, 10, 10,
//     6, 9, 10, 7,  7,  8
//  ]));
console.log('result', findPeakElement([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1
  ]));