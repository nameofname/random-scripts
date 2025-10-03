/**
 * This was a problem marked 'EASY'... which it was...
 * But my solution beats 100% on runtime. Never had that beore :) 
 */
var removeElement = function(nums, val) {
    let counter = 0;
    for (let i=0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[counter] = nums[i];
            counter++;
        }
    }
    return counter;
};