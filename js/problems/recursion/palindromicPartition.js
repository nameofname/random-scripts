/**
 * Here a partition is a substring
 * The idea is to print every substirng of a given string which is a palindrome
 */

function isPalindrome(str) {
    return str.split('').reverse().join('') === str;
}

function findPalindromicPartitions(str) {
    const palindromes = [];

    function _find(str) {
        if (isPalindrome(str)) {
            palindromes.push(str);
        }
        const newStr = str.slice(0, str.length - 1)
        if (newStr) {
            _find(newStr);
        }
    }

    const arr = str.split('');
    while (arr.length) {
        const startingStr = arr.join('');
        _find(startingStr);
        arr.shift();
    }
    return palindromes;
}

console.log(findPalindromicPartitions('finis'))
console.log(findPalindromicPartitions('this is my racecar'))
