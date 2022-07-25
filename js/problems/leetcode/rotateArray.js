/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 function rotate(nums, k) {
    const a = new Array(nums.length);
    k = k % nums.length;
    for (let i = 0; i <= k; i++) {
        a[k - i] = nums[nums.length - i]
    }
    for (let i = k; i < nums.length; i++) {
        a[i] = nums[i - k];
    }
    return a;
};

console.log(rotate([1,2,3,4,5,6,7], 3));