/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
    let list = [];

    function _gen(stem, openCount, closeCount) {
        if (closeCount === n) {
            list.push(stem);
            return '';
        }
        if (closeCount < openCount) {
            _gen(stem + ')', openCount, closeCount + 1);
        }
        if (openCount < n) {
            _gen(stem + '(', openCount + 1, closeCount);
        }
        
        return stem;
    }

    _gen('', 0, 0);
    return list;
};

// console.log(generateParenthesis(1));
// console.log(generateParenthesis(2));
console.log(generateParenthesis(3));
// console.log(generateParenthesis(4));
