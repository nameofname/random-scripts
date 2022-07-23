// https://leetcode.com/problems/fraction-to-recurring-decimal/
// 4:50 - 5:11

function fractionToDecimal(numerator, denominator) {
    // const m = new Map();
    const decimal = [];
    let seen;

    const int = Math.floor(numerator / denominator);
    const mod = numerator % denominator;

    function _decStep(n, d) {
        const int = Math.floor(n * 10 / d);
        const key = `${int}-${d}`;
        if (decimal.includes(key)) {
            return seen = key;
        }
        decimal.push(key);
        if (seen) return;
        const mod = n * 10 % denominator;
        if (mod !== 0) {
            return _decStep(mod, d);
        }
    };

    if (mod !== 0) _decStep(mod, denominator);
    let decimalStr = decimal.map(s => {
        const num = s.split('-')[0];
        return s === seen ? `(${num}` : num;
    }).join('');
    if (seen) decimalStr += ')';
    return `${int}${decimalStr ? '.' : ''}${decimalStr}`;
}

console.log(fractionToDecimal(1, 2));
console.log(fractionToDecimal(2, 1));
console.log(fractionToDecimal(4, 333));
console.log(fractionToDecimal(1, 6));