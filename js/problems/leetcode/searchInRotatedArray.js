/**
 * https://leetcode.com/problems/search-in-rotated-sorted-array/submissions/
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 function search(nums, target) {
    if (nums.length === 1) {
        return nums[0] === target ? 0 : -1;
    }
    let l = 0, r = nums.length - 1, inflection;
    // if rotated, find rotation point : 
    if (nums[0] > nums.slice(-1)[0]) {        
        while (inflection === undefined) {
            const newMid = Math.floor(l + ((r - l) / 2));
            const isInflection = nums[newMid] > nums[newMid + 1];
            // console.log('isInflection', isInflection, l, r, newMid)
            if (isInflection) {
                inflection = newMid;
            } else {
                if (nums[l] > nums[newMid]) {
                    // then inflection is between right and mid
                    r = newMid;
                } else {
                    l = newMid;
                }
            }
        }
    }

    // console.log(l, r, inflection);
    // now that i have the inflection point, search between the inflection and either end of the array - but only on the side that makes sense ...
    let newL = 0, newR = nums.length - 1;
    if (inflection) {
        if (nums[0] <= target) {
            newL = 0;
            newR = inflection;
        } else {
            newL = inflection + 1;
            newR = nums.length - 1;
        }
    }

    // console.log('begin search', newL, newR)
    while (true) {
        const newMid = newL + Math.floor((newR - newL) / 2);
        // console.log('searching', newL, newR, newMid)
        if (nums[newMid] === target) {
            return newMid;
        } else if (nums[newL] === target) {
            return newL;
        } else if (nums[newR] === target) {
            return newR;
        } else {
            if (newR - newL <= 1) {
                return -1;
            }
            if (nums[newMid] < target) {
                newL = newMid;
            } else {
                newR = newMid;
            }
        }
    }
    // return -1;
};