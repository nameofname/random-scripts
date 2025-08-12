const digitMap = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
};

/**
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 * This prolem has terrible perfomance. 
 * However the problem specifies that digits.length must be <= 4, which makes the perf tolerable. 
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
    digits = digits.split('');
    let words = [];
    while (digits.length) {
        const currLetterArr = digitMap[digits.shift()];
        if (!words.length) {
            words = currLetterArr.map(letter => [letter]);
        } else {
            words = words.reduce(( acc, currWord ) => {
                const newWords = currLetterArr.map(letter => {
                    return [...currWord, letter];
                });
                return [...acc, ...newWords];
            }, []);
        }
    }
    return words.map(word => word.join(''));
};

console.log(letterCombinations('2'));
console.log(letterCombinations('23'));
// console.log(letterCombinations('23659364647')); // DO NOT RUN TAKES FOREVER! 


/**
 * 2025 solution - this one beats 100% in run time! 
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (digits === "") return [];
    const o = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    };
    let idx = 0;
    let results = o[digits[idx]].split('');
    while (digits[++idx]) {
        const currLetters = o[digits[idx]];
        const currResults = results;
        results = [];
        for (let i = 0; i < currResults.length; i++) {
            for (let j = 0; j < currLetters.length; j++) {
                results.push(`${currResults[i]}${currLetters[j]}`)
            }
        }
    }
    return results;
};