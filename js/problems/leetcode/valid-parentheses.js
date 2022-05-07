const parenMap = {
    '}': '{',
    ')': '(',
    ']': '['
};
const openers = Object.values(parenMap);
/**
 * https://leetcode.com/problems/valid-parentheses/
 * This answer is fine and executes in a single pass.
 * Not bad but it's slower than almost all online submissions. 
 * So there's a much faster way to do it, and it's
 * based on the following direction from the problem :
 *      s consists of parentheses only '()[]{}'.
 * ...This means that you don't have to maintain a separate list for the closing parens. 
 * @param {string} s
 * @return {boolean}
 */
function isValid_bak(s) {
    const openings = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (openers.includes(char)) {
            openings.push(char);
        } else if (parenMap[char]) {
            if (parenMap[char] !== openings.slice(-1)[0]) {
                return false;
            } else {
                openings.pop();
            }
        }
    }
    return openings.length === 0;
};

const bracketMap = {
    '{': '}',
    '(': ')',
    '[': ']'
};

/**
 * Here is the solution much faster.
 * I believe the time savings comes
 * from the fact that I'm no longer using 
 * array.includes(). 
 */
function isValid(s) {
    const openings = [];
    for (let i = 0; i < s.length; i++) {
        if (bracketMap[s[i]]) {
            openings.push(s[i]);
        } else if (bracketMap[openings.pop()] !== s[i]) {
            return false;
        }
    }
    return openings.length === 0;
};


console.log(isValid("()"))
console.log(isValid("()[]{}"))
console.log(isValid("(]"))
console.log(isValid("{[]}"))
console.log(isValid("["))

