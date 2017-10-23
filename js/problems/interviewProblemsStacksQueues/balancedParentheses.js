"use strict";

// 3.2 Create a function that will evaluate if a given expression has balanced parentheses -- Using stacks

const Stack = require('./Stack');
const expressionTrue = "{{}}{}{}";
const expressionFalse = "{}{{}";
const expressionFalse1 = "{}}{}";

const isBalanced = str => {
    const stack = new Stack();
    const arr = str.split('');

    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        if (curr === '{') {
            stack.push(1);
        } else if (curr === '}') {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.length === 0;
};

console.log(isBalanced(expressionTrue));
console.log(isBalanced(expressionFalse));
console.log(isBalanced(expressionFalse1));