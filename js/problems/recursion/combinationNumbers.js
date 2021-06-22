/**
 * Given a string of numbers
 * find all combos of numbers that can be formed
 * by using the numbers in the same order
 */

// 12:39 ... 
function comboNumbers(str) {
    const arr = str.split('');
    const out = [];

    function _recur(curr) {
        const tmp = [...curr];        
        while (tmp.length) {
            out.push(tmp.join(''));
            tmp.shift();
        }

        const recArr = curr.slice(0, curr.length - 1);
        if (recArr.length) {
            _recur(recArr);
        }
    }

    _recur(arr);
    return out;
}

console.log(comboNumbers('1234'));
// 1234 234 34 4
// 123 23 3
// 12 2
// 1