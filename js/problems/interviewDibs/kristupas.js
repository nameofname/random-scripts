// write a function that returns true if any two numbers in the array sum up to 10
// i like this
// 1:17 - 1:26
// commentary : this is just 2 sum. i looked at the answer... i was overthinking it...
// basically i was thinking about whether you need to loop over the whole array, and you do because numbers can be negative
// then i was thinking about using array.includes, which fails because if you're looking at a 5, and there's only 1 5,
// it will return true when it shouldn't -- ie. [5,6] // true
// but the whole time i knew it was possible to use a map, i was just hesitating because idk, i thought it would take too much memory
// but looks like that actually is the fastest solution in this case. 
// also in a lot of real life programming situations so ... probably a good lesson :) 
function tenSum(arr) {
    // arr.sort((a, b) => a - b);
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (map.get(10 - arr[i])) {
            return true;
        }
        map.set(arr[i], true);
    }
    return false;
}
 
console.log(tenSum([1,2,3,4,5,6,7,8,11,13]));
console.log(tenSum([5,9]));
console.log(tenSum([3,9]));