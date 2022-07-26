// https://leetcode.com/problems/largest-number/

// this one works, and is almost the fastest solution! 
function largestNumber(nums) {
    nums.sort((a, b) => {
        const n1 = Number(String(a) + String(b));
        const n2 = Number(String(b) + String(a));
        return n1 > n2 ? -1 : 1;
    });
    let s = nums.join('');
    s = s.replace(/^0*/, ''); // replace leading zeros
    s = s.length === 0 ? '0' : s;
    return s;
}


// I thought this worked until I encountered the test case [111311, 1113]
function largestNumber_attempt1(nums) {
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
console.log(largestNumber([111311, 1113])); // "1113111311" not "1113111113"
console.log(largestNumber([0, 0])); // "0" not "00"
console.log(largestNumber([999999998,999999997,999999999])); // "999999999999999998999999997"