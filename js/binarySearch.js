// 1:59 - 2:08 ... but not sure edge cases? 
// this function is to do binary search of a sorted array
// it's the classic 2 pointer solution 
// the one odd thing here is that i coded it to account for unsorted array input
// and return the index of the needle in the sorted array
// which is not very useful in practice, especially since i'm sorting the input array in place
// which is bad. but you get the idea. xo 
function binarySearch_bak(arr, needle) {
    if (arr.length === 1) {
        return arr[0] === needle ? 0 : -1;
    }
    // disable this line if we can assume that the input array is already sorted.
    arr.sort((a,b) => a - b);
    let l = 0;
    let r = arr.length - 1;
    while(l < r) {
        const increment = (Math.floor((r - l) / 2));
        const newMid = l + increment;
        if (arr[l] === needle) {
            return l;
        } else if (arr[r] === needle) {
            return r;
        } else if (arr[newMid] === needle) {
            return newMid;
        }
        if (arr[newMid] < needle) {
            l = newMid
        } else {
            r = newMid;
        }
    }
    return -1;
}

// UPDATE! I read someone else's binary search implementation, and I realize it can be done in waaaay fewer lines. Adapt from : 
// var searchRange = function(nums, target) {
//     const search = (l, r, first) => {
//         while (l <= r) {
//             const mid = Math.floor((l + r) / 2);
//             if (nums[mid] === target) {
//                 if (first) {
//                     if (nums[mid - 1] !== target) return mid;
//                     r = mid - 1;
//                 } else {
//                     if (nums[mid + 1] !== target) return mid;
//                     l = mid + 1;
//                 }
//             } else if (nums[mid] < target) l = mid + 1;
//             else r = mid - 1;
//         }
//         return -1;
//     };
//     const first = search(0, nums.length - 1, true);
//     if (first === -1) return [-1, -1];
//     return [first, search(0, nums.length - 1, false)];
// };

/**
 * This is the new version I learned... there are 2 modifications that make the code more terse : 
 * 1) don't check arr[l], arr[r] and arr[mid] every time - instead just check arr[mid]
 *      what allows this is that you advance l to mid + 1 instead of mid
 *      and you also advance r to mid - 1 instead of mid
 *      that's ok because you only do so if mid < needle, so the left pointer can't accidentally 
 *      'slip past' the number
 *      same thing on the right hand side... you only do it if mid < needle, AND mid !== needle
 *      which means that mid > needle, so it can't slip past
 * 2) run the loop using (l <= r) instead of (l < r)
 *      now that you have the trick of not letting either side slip past the needle, and you're 
 *      incrementing to 1 past the mid, you can allow the loop to run when l === r, because
 *      when l === r, mid will === l, so you'll be checking both L and R, then advancing L and R
 *      past each other, causing the loop to terminate.
 * @param {Array} arr 
 * @param {Number} needle 
 * @returns {Number}
 */
function binarySearch(arr, needle) {
    let l = 0, r = arr.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (arr[mid] === needle) {
            return mid;
        } else if (arr[mid] < needle) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return -1;
}


console.log(binarySearch([1,2,3,4,5,6,7,8,9,8,7,6,4,3,3,2,1,1], 5)); // 4
console.log(binarySearch([1,2,2], 1)); // 0
console.log(binarySearch([1,2], 1)); // 0
console.log(binarySearch([1,2], 1)); // 0
console.log(binarySearch([0,1], 1)); // 1
console.log(binarySearch([0,0,0,1], 1)); // 3
console.log(binarySearch([1], 1)); // 0
console.log(binarySearch([0,0], 1)); // -1
console.log(binarySearch([2,3,4,5], 1)); // -1
