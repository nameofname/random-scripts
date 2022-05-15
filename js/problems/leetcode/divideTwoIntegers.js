/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
function divide(dividend, divisor) {
    let curr = 0;
    let count = 0;
    let posNeg = '-';
    if (dividend < 0 && divisor < 0) {
        posNeg = '';
    } else if (dividend > 0 && divisor > 0) {
        posNeg = '';
    }
    const d = Math.abs(divisor);
    while (curr < Math.abs(dividend)) {
        curr += d;
        ++count;
    }
    count = (curr > Math.abs(dividend)) ? count - 1 : count;
    count = parseInt(`${posNeg}${count}`);
    if (-Math.pow(2, 31) > count) {
        return -Math.pow(2, 31);
    } else if (count > (Math.pow(2, 31) - 1)) {
        return Math.pow(2, 31) - 1;
    }
    return count;
};

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
function divide_bak(dividend, divisor) {
    let curr = 0;
    let count = 0;
    let posNeg = '-';
    if (dividend < 0 && divisor < 0) {
        posNeg = '';
    } else if (dividend > 0 && divisor > 0) {
        posNeg = '';
    }
    while (curr < Math.abs(dividend)) {
        curr += Math.abs(divisor);
        ++count;
    }
    count = (curr > Math.abs(dividend)) ? count - 1 : count;
    count = parseInt(`${posNeg}${count}`);
    if (!(-Math.pow(2, 31) < count < (Math.pow(2, 31) - 1))) {
        return posNeg ? -Math.pow(2, 31) : Math.pow(2, 31) - 1;
    }
    return count;
};

console.log(divide(-2147483648, 1))

// 2,147,483,648
