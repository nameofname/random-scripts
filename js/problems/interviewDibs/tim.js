let argCount = 0;
let currSum = 0;

// 12:10 - 12:24
function add() {
    argCount = argCount + arguments.length;
    const newNum = currSum + [...arguments].reduce((a,c) => a + c, 0);
    if (argCount === 3) {
        argCount = 0;
        currSum = 0;
        return newNum;
    } else {
        currSum = newNum;
        return function() {
            return add.apply(this, arguments);
        }
    }
}

console.log(add(1, 2, 3)); // returns 6
console.log(add(1)(2, 3)); // return 6
console.log(add(1, 2)(3)); // returns 6
console.log(add(1)(2)(3)); // returns 6
