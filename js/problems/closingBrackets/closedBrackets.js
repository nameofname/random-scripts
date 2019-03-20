const closingObj = {
    '(': ')',
    '[': ']',
    '{': '}',
};
const closingBrackets = Object.values(closingObj);

function stringIsValid(string) {
    const arr = string.split('');
    const unclosed = [];
    let tooManyClosing = false;

    arr.forEach(s => {
        if (closingObj[s]) {
            unclosed.push(s);
        } else if (closingBrackets.includes(s)) {
            if (unclosed.length === 0) {
                tooManyClosing = true;
            }
            const needed = closingObj[unclosed[unclosed.length - 1]];
            if (s === needed) {
                unclosed.pop();
            }
        }
    });

    return unclosed.length === 0 && !tooManyClosing;
}

console.log(stringIsValid('(thi){s} [(string)] is valid {} {[()]}'));
console.log(stringIsValid('(thi){s} [(string)] is NOT valid {} {[(]}'));
console.log(stringIsValid('(thi){s} [(string)] is NOT valid {[]}}}'));
