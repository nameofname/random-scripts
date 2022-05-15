// 1:59 - 2:08 ... but not sure edge cases? 
// this function is to do binary search of a sorted array
// it's the classic 2 pointer solution 
// the one odd thing here is that i coded it to account for unsorted array input
// and return the index of the needle in the sorted array
// which is not very useful in practice, especially since i'm sorting the input array in place
// which is bad. but you get the idea. xo 
function binarySearch(arr, needle) {
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

// console.log(binarySearch([1,2,3,4,5,6,7,8,9,8,7,6,4,3,3,2,1,1], 5));
// console.log(binarySearch([1,2,2], 1));
console.log(binarySearch([2,1], 1));