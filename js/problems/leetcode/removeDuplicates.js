/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/submissions/
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    let c = 0;
    for (let i = 0; i  < nums.length; i++) {
        nums[c] = nums[i];
        if (nums[i + 1] !== nums[c]) {
            ++c;
        }
    }
    console.log(nums);
    return c;
};

console.log(removeDuplicates([1,1,2])); // 2
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // 5
