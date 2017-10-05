// global scope
// var a is in function scope, b is global.
(function() {
    var a = b = 5;
})();

console.log(b);


// defining native methods
String.prototype.repeatify = function(int) {
    var i = int;
    var out = '';
    while (i > 0) {
        i--;
        out += this;
    }
    return out;
};

console.log('hello'.repeatify(3));


// hoisting
// var a gets hoisted, but not defined, at runtime. Therefore, it's undefined instead of 'not defined' error
function test() {
    console.log(a);
    console.log(foo());

    var a = 1;
    function foo() {
        return 2;
    }
}

test();


// 'this' keyword :
// this depends on the method of invocation
// in a browser, var fullname is a property of window
// however in Node.js - variables don't get assigned to the global object.
var fullname = 'John Doe';
var obj = {
    fullname: 'Colin Ihrig',
    prop: {
        fullname: 'Aurelio De Rosa',
        getFullname: function() {
            return this.fullname;
        }
    }
};

console.log('getFullname 1', obj.prop.getFullname());

var getName = obj.prop.getFullname;

console.log('getFullname 2', getName()); // 'John Doe' in browser, undefined in Node.js

console.log('getFullname 3', getName.apply(obj.prop)); // 'John Doe' in browser, undefined in Node.js



// occurrences of a given character in a string

const occurrences = (string, char) => {
    return string
        .split('')
        .reduce((prev, c) => {
            return prev + (c === char ? 1 : 0);
        }, 0);
};

console.log('occurrences', occurrences('ronalds rons r', 'r'));



const findDuplicate = arr => {
    const obj = {};
    let dupes = [];
    arr.forEach(n => {
        if (obj[n]) {
            dupes.push(n);
        }
        obj[n] = true;
    });
    return dupes;
};

console.log('findDuplicate', findDuplicate([1,2,3,4,5,6,3,7,8,9]));


// { 1: 'a', 2: 'b', ... }
const alphaMap = [...Array(26)]
    .reduce((prev, a, idx) => Object.assign(prev, { [idx + 1] : String.fromCharCode(idx + 97) }), {});


// for a given number, translate to all permutations of a string it could represent
// for example, 1 = a, 12 = either ab or l (since l is the 12th letter in the alphabet)
// 123 could be abc, am, lc,
const translateNumbers = number => {

    const arr = `${number}`.split('');

    const recur = (remainingArr, permutations) => {
        let withLetter1 = [];
        let withLetter2 = [];

        const n1 = remainingArr.shift();
        const n2 = `${n1}${remainingArr[0]}`;
        const letter1 = alphaMap[n1];
        const letter2 = alphaMap[n2];

        withLetter1 = permutations.map(str => `${str}${letter1}`);
        if (letter2) {
            withLetter2 = permutations.map(str => `${str}${letter2}`);
        }

        const newPermutations = [...withLetter1, ...withLetter2];

        if (remainingArr.length > 0) {
            return recur(remainingArr, newPermutations)
        }

        return newPermutations;
    };

    return recur(arr, ['']);
};

console.log('=========================')
console.log(translateNumbers(12345));
console.log(translateNumbers(1125312));