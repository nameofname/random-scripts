/**
 * Problem : 
A binary string is monotone increasing if it consists of some number of 0's (possibly none), followed by some number of 1's (also possibly none).
You are given a binary string s. You can flip s[i] changing it from 0 to 1 or from 1 to 0.
Return the minimum number of flips to make s monotone increasing.

 * Explanation : 
 * This solution works because you're trying to pick the inflection point
 * Working from left to right, each time you see a 1, that's potentiall the point at which you should switch
 * Start counting ones and zeros after this point
 * If the number of zeros ever exceeds the number of ones, then it would make more sense to flip those ones to zero
 * If the number of zeros never does exceed the number of ones, it makes more sense to flip them to 1
 * If you find that the inflection point is not used, but a different one is used later on...
 * ...then you have to remember all the 1s up to that point in the discardedOnes variable
 * So in the end, the total # of flips needed is the discardedOnes + zeros (after inflection)
 * 
 * 
 * @param {string} s
 * @return {number}
 */
function minFlipsMonoIncr(s) {
    const arr = s.split('');
    let zeros = 0;
    let ones = 0;
    let discardedOnes = 0;
    let inflection; 

    for (i = 0; i < arr.length; i++) {
        if (arr[i] === '1' && inflection === undefined) {
            inflection = i;
        }
        if (inflection !== undefined) {
            if (arr[i] === '1') {
                ++ones;
            } else {
                ++zeros;
            }
        }
        if (zeros > ones) {
            inflection = undefined;
            discardedOnes += ones;
            zeros = 0;
            ones = 0;
        }
    }

    // you must flip all zeros after your inflection
    // and all discarded ones from unused inflections
    return zeros + discardedOnes;
};

console.log(minFlipsMonoIncr('00110')); // 1
console.log(minFlipsMonoIncr('010110')); // 2
console.log(minFlipsMonoIncr("00011000")); // 2
console.log(minFlipsMonoIncr('000000111001111111')); // 2
console.log(minFlipsMonoIncr("0011000010")); // 3
