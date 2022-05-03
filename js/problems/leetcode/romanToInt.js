/**
 * @param {string} s
 * @return {number}
 */
const charMap = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
};
 
function romanToInt(s) {
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        let value = charMap[letter];
        if (['I', 'X', 'C'].includes(letter)) {
            if (charMap[s[i + 1]] === value * 5 || charMap[s[i + 1]] === value * 10) {
                value = value * -1;
            }
        }
        total += value;
    }
    return total;
};

// console.log(romanToInt('XXVI'));
console.log(romanToInt('III')); // 3
console.log(romanToInt('IV')); // 4
console.log(romanToInt('LVIII')); // 58
console.log(romanToInt('MCMXCIV')); // 1994