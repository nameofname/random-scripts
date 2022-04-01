/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    const range = [ -Math.pow(2, 31), Math.pow(2, 31) - 1 ];
    const arr = String(s).split('');
    let sign;
    if (arr[0] === '-' || arr[0] === '+') {
        sign = arr.shift() === '-' ? -1 : 1;
    }
    let n;
    while (arr[0] === '0') {
        arr.shift();
    }
    return Number(arr.join('')) * sign;
};

console.log(myAtoi('123'));
console.log(myAtoi('000234'));
console.log(myAtoi('-000234'));