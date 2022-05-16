/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 11:44 - 12:50 no solution but i got 3.5 hours of sleep last night so... 
 ... then worked on it for like 20 minutes to clear all bugs the following day
 definitely more clear headed, but the edge cases and bugs were tough to nail all down
 https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/submissions/
 */
 function searchRange(nums, target) {
    if (nums.length === 1) {
        // edge case - can't binary search over an array of length = 1
        return nums[0] === target ? [0, 0] : [-1, -1];
    }

    // binary search to find the left side :
    let l = 0,
        r = nums.length - 1,
        leftBoundary,
        detectedRight = r;

    while (l < r && leftBoundary === undefined) {
        if (nums[r] !== target) {
            detectedRight = r;
        }
        const newMid = l + Math.floor((r - l) / 2);
        // console.log('search1', l, r, newMid);
        if (nums[l] === target && nums[l - 1] !== target) {
            leftBoundary = l;
        } else if (nums[r] === target && nums[r - 1] !== target) {
            leftBoundary = r;
        } else if (nums[newMid] === target && nums[newMid - 1] !== target) {
            leftBoundary = newMid;
        } else {
            if (nums[newMid] < target && newMid !== l) {
                l = newMid;
            } else {
                r = newMid;
            }
        }
    }

    if (leftBoundary === undefined) {
        return [-1, -1];
    }

    let l1 = Math.max(leftBoundary - 1, 0),
        // edge case ^ start with left boundary - 1 because left bound might be right bound too (ei. only 1 of target in set)
        r1 = detectedRight !== undefined ? detectedRight : nums.length - 1,
        rightBoundary;

    // console.log('start search2', l1, r1, detectedRight);
    while (l1 < r1 && rightBoundary === undefined) {
        const newMid = l1 + Math.floor((r1 - l1) / 2);
        // console.log('search2', l1, r1, newMid);
        if (nums[l] === target && nums[l + 1] !== target) {
            rightBoundary = l;
        } else if (nums[r] === target && nums[r + 1] !== target) {
            rightBoundary = r;
        } else if (nums[newMid] === target && nums[newMid + 1] !== target) {
            rightBoundary = newMid;
        } else {
            if (nums[newMid] > target && r1 !== newMid) {
                r1 = newMid;
            } else {
                l1 = newMid;
            }
        }
    }

    return [leftBoundary, rightBoundary];
};