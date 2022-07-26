/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function rotate(nums, k) {
    const tmp = nums.slice(-1 * k);
    for (let i = nums.length - 1; i >= k; i--) {
        nums[i] = nums[i - k];
    }
    for (let j = 0; j < tmp.length; j++) {
        nums[j] = tmp[j];
    }
    return nums;
};

// niave solution exceeds the time limit.
function rotate_niave(nums, k) {
    for (let i = 0; i < k; i++) {
        nums.unshift(nums.pop());
    }
    return nums;
}

console.log(rotate([1,2,3,4,5,6,7], 3));