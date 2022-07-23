//https://leetcode.com/problems/majority-element/
// find the element that appears the most times in the array
// can i do it in one pass?

function majorityElement(nums) {
    let majority;
    const m = new Map();
    for (let i = 0; i < nums.length; i++) {
        const count = m.has(nums[i]) ? m.get(nums[i]) + 1 : 1;
        m.set(nums[i], count);
        const mCount = majority?.[1] || 0;
        if (count > mCount) {
            majority = [nums[i], count];
        }
    }
    return majority ? majority[0] : 0;
}

console.log(majorityElement([3,2,3]));
console.log(majorityElement([2,2,1,1,1,2,2]));