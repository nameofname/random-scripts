/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * Note, this is my solution that works in the best running time
 * It relies on sorting the array
 * The leetcode example wants the indicies of the found pairing returned
 * So you can't do that without a lot of extra code
 * 
 */
 var twoSumFast = function(nums, target) {
    nums = nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        inner:
        for (let j = i + 1; j < nums.length; j++) {
            const sum = nums[i] + nums[j];
            if (sum === target) {
                return [nums[i], nums[j]];
            } else if (sum > target) {
                break inner;
            }
        }
    }
};

/**
 * Here's my solution that will work for leet code. 
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const sum = nums[i] + nums[j];
            if (sum === target) {
                return [i, j];
            }
        }
    }
};

console.log(twoSum([2,7,15,11], 9))