// https://leetcode.com/problems/fraction-to-recurring-decimal/
// 4:50 - 5:11

function fractionToRepeatingDecimal(numerator, denominator) {
    const m = new Map();
    let decimal = '';
    const int = Math.floor(numerator / denominator);
    const mod = numerator % denominator;

    function _decStep(n, d) {
        const key = `${n}-${d}`;
        const seen = m.has(key);
        if (seen) {
            decimal = '(' + decimal + ')';
            return;
        }
        m.set(key, true);
        const int = Math.floor(n / denominator);
        const mod = n % denominator;
        decimal += int;
        if (mod !== 0) {
            return _decStep(mod * 10, d);
        }
    };

    if (mod !==0) _decStep(mod * 10, denominator)
    return `${int}${decimal ? '.' : ''}${decimal}`;
}

console.log(fractionToRepeatingDecimal(1, 2));
console.log(fractionToRepeatingDecimal(2, 1));
console.log(fractionToRepeatingDecimal(4, 333));