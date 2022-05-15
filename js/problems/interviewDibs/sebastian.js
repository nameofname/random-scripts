/**
Balanced bracket function: write a function that accepts a string and returns a boolean
indicating whether or not the string has balanced brackets (i.e. equal numbers of opening
and closing “[”, “{”, and “(“ that are also nested properly). Will tell the interview
not to use a standard for loop for iterating over arrays and instead use es6 structures
like for/of or possible forEach
// 1:30 - pause 1t 1:32, resume at 1:35, done at 1:40 ... ~5 mins total code time? 
// realized later that I DIDN'T DO THIS CORRECTLY! I forgot to check that all brackets were closed.
// additional 1:56 - 1:57
 */
const openers = {
    '{': '}',
    '(': ')',
    '[': ']',
};
const closers = {
    '}': '{',
    ')': '(',
    ']': '[',
};
function balancedBrackets(s) {
    const opened = [];
    for (char of s) {
        if (closers[char]) {
            if (opened.slice(-1)[0] !== closers[char]) {
                return false;
            } else {
                opened.pop();
            }
        }
        if (openers[char]) {
            opened.push(char);
        }
    }
    return opened.length === 0;
}

console.log(balancedBrackets('[{ronald()}]')); // true
console.log(balancedBrackets('[{ronald(){}]')); // false
console.log(balancedBrackets('[{ronald()}](')); // false