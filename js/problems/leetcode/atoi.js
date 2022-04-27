/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    const range = [ -Math.pow(2, 31), Math.pow(2, 31) - 1 ];
    const arr = String(s).trim().split('');
    let sign = 1;
    if (arr[0] === '-' || arr[0] === '+') {
        sign = arr.shift() === '-' ? -1 : 1;
    }
    const digits = [];
    const re = /\d/;
    loop:
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '0' && !digits.length) {
            continue;
        } else if (re.test(arr[i])) {
            digits.push(arr[i]);
        } else {
            break loop;
        }
    }

    const ret = Number(digits.join('')) * sign;
    if (ret < range[0] || ret > range[1]) {
        return ret < range[0] ? range[0] : range[1];
    }
    return ret;
};

console.log(myAtoi('123'));
console.log(myAtoi('000234'));
console.log(myAtoi('-000234'));
console.log(myAtoi('2147483648'));
console.log(myAtoi('2147483649'));
console.log(myAtoi("4193 with words"));
console.log(myAtoi("   123"));
console.log(myAtoi("-91283472332"));