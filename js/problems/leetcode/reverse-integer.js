// https://leetcode.com/problems/reverse-integer/ 
var reverse_bak = function(x) {
    let arr = String(x).split('');
    let sign;
    if (arr[0] === '-') {
        sign = arr.shift();
    }
    arr = arr.map(Number).reverse();
    const maxN = sign ? Math.pow(2, 31) : Math.pow(2, 31) - 1;
    const max = String(maxN).split('').map(Number);
    if (arr.length > max.length) {
        return 0;
    } else if (arr.length == max.length) {
        let i = 0;
        while (i < max.length) {
            if (arr[i] < max[i]) {
                break;
            } else if (arr[i] > max[i]) {
                return 0;
            }
            ++i;
        }
    }
    return Number(`${sign || ''}${arr.join('')}`);
};

// this is much faster (no looping), but it's actually an illegal answer
// since you're not supposed to use 64 bit ints.
var reverse = function(x) {
    const range = [ -Math.pow(2, 31), Math.pow(2, 31) - 1 ];
    const arr = String(x).split('').reverse();
    let sign;
    if (arr[arr.length - 1] === '-') {
        sign = arr.pop();
    }
    const out = Number(`${sign || ''}${arr.join('')}`);
    if (range[0] <= out && out <= range[1]) {
        return out;
    }
    return 0;
};

// console.log(reverse(123));
// console.log(reverse(12345));
// console.log(reverse(-12345));
console.log(reverse(2147483647));
console.log(reverse(2147483649));
console.log(reverse(2147483647));
console.log(reverse(-2147483649));
console.log(reverse(8463847412));
// console.log(reverse(900000));
// console.log(reverse(1534236469));
// 9646324351
// 2147483647

/**
 * Another solution from a year later... this one was pretty easy actually, idk why labeled medium.
 */
var reverse = function(x) {
    let n = String(x).split('').reverse();
    if (n[n.length - 1] === '-') {
        n.unshift(n.pop())
    }
    // console.log('a', x, n, [n.length - 1] === '-');
    n = Number(n.join(''));
    // console.log('c', n, n > Math.pow(2, 31));
    if ((Math.pow(2, 31) * -1) < n  && n < (Math.pow(2, 31) - 1)) {
        return n;
    }
    return 0;
};