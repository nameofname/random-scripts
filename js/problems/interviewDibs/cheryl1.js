// 11:43 (11:51 ? - nope, 11:59)
function addArrays(a1, a2) {
    let remainder = 0;
    const longer = a1.length > a2.length ? a1 : a2;
    const shorter = longer === a1 ? a2 : a1;
    const res = [];
    for (let i = longer.length - 1; i >= 0; i--) {
        const shorterNum = shorter[i - (longer.length - shorter.length)];
        const curr = longer[i] + (shorterNum || 0) + remainder;
        res.unshift(curr % 10);
        remainder = curr > 10 ? 1 : 0;
    }
    return res;
}

console.log(addArrays([1,1,2,3], [4,5,9]));

// 123
// 459
//   2
//  82
// 582