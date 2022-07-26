// https://leetcode.com/problems/fraction-to-recurring-decimal/
// 4:50 - 5:11

function fractionToDecimal(numerator, denominator) {
    const decimal = [];
    let seen;
    const sign = (numerator * denominator) < 0 ? '-' : '';
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);
    const int = Math.floor(numerator / denominator);
    const mod = numerator % denominator;

    function _decStep(n) {
        const int = Math.floor(n * 10 / denominator);
        const key = `${int}-${n}`;
        if (decimal.includes(key)) {
            return seen = key;
        }
        decimal.push(key);
        if (seen) return;
        const mod = n * 10 % denominator;
        if (mod !== 0) {
            return _decStep(mod, denominator);
        }
    };

    if (mod !== 0) _decStep(mod);
    let decimalStr = decimal.map(s => {
        const num = s.split('-')[0];
        return s === seen ? `(${num}` : num;
    }).join('');
    if (seen) decimalStr += ')';
    return `${sign}${int}${decimalStr ? '.' : ''}${decimalStr}`;
}

// console.log(fractionToDecimal(1, 2));
// console.log(fractionToDecimal(2, 1));
// console.log(fractionToDecimal(4, 333));
// console.log(fractionToDecimal(1, 333));
// console.log(fractionToDecimal(1, 6));
// console.log(fractionToDecimal(-50, 8));
console.log(fractionToDecimal(-22, -2));
