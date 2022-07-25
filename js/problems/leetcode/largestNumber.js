// https://leetcode.com/problems/largest-number/

function largestNumber(nums) {
    function _toDec(n) {
        const factor = Math.pow(10, String(n).length - 1);
        return n / factor;
    }
    nums.sort((a, b) => {
        return _toDec(b) - _toDec(a);
    });
    return nums.join('');
}

console.log(largestNumber([10,2]));
console.log(largestNumber([3,30,34,5,9]));