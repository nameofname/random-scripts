"use strict";
let n = 5;
console.log(n);
// Arrays: 
// An array can be specified to be of a certain type : 
const a1 = ['asdf', 'asdfasdf'];
const a2 = [1, 2, 3];
// now we have 2 ways of saying the same thing : 
const tup = [1, 'asdf'];
const Tup = [1, 'asdf'];
// Tuple array: 
const tArr = [
    [1, 'ron'],
    [2, 'danielle'],
    [3, 'harry'],
];
// destructuring from arrays is sort of counterintuitive : 
const arr = [1, 2];
const [n1, n2] = arr;
// but what about this : 
const [t1, t2] = [123, 'string'];
// if you try to reverse the order you get an error " 
// const errorArr: Tup = ['bla', 1]; // Type 'string' is not assignable to type 'number'.
// 2d arrays can get very confusing in TS, but the syntax is like :
const stringMatrix = [
    ['one', 'two', 'three']
];
// Functions : 
function adder(x, y) {
    return x + y;
}
// Union type in a function : 
// the | is for union, the void means no return value
function logStrNum(message) {
    console.log(message);
}
function cb(s) {
    return 'well i did this : ' + s;
}
// Functions as arguments : 
function doSomething(callback) {
    const s = 'id love to do this thing';
    console.log(s);
    return callback(s);
}
doSomething(cb);
const nn = "Ronald";
// const nnn:NameStr = "Dumbo"; // error.
// Type Assertion, 2 forms, <> and as
// Note* type assertion is really useful in cases like this
// where the type is ambiguous
let cid = 1;
let c1 = cid;
let c2 = cid;
const person = {
    name: 'bonzo',
    age: 23
};
// consuming an interface for multiple function definitions
const add = (x, y) => x + y;
const sub = (x, y) => x - y;
const div = (x, y) => x / y;
// note the keyword implements
class Guy {
    constructor(id, name, fantasy, thingies) {
        this.name = name;
        this.id = id;
        this.fantasy = fantasy || '';
        this.thingies = thingies || '';
    }
    holla() {
        return `Holla at me ${this.name}`;
    }
}
const mike = new Guy(4, 'mikey', 'asdf');
// Extending classes 
class ManGuy extends Guy {
    constructor(id, name, grumbling) {
        super(id, name);
        this.grumbling = grumbling;
    }
}
// Generics !!! 
// Finally the fucking angle brackets! 
// It's basically a placeholder type that you can define later
// So... you could have a function like this : 
/**
function getArray(arr: any[]): any[] {
    return new Array().concat(arr);
}
 */
// But if later you want an array of a certain type, you can't
// So instead of array of any (any[]) we'll use a generic
function getArray(arr) {
    return new Array().concat(arr);
}
// We put the <T> in angle brackes, and replace the any type with T
// Then, we can pass a concrete type to the function which takes the place of the generic :
const numArray = getArray([1, 2, 3, 4]);
const strArray = getArray(['bob', 'lob', 'law']);
// strArray.push(1); // error
// So you can see that the <T> is kind of a placeholder, you want to use the same function
// for different things, but you don't want to decide the type for all uses of the funciton
// and it allows you to do that at function invocation time. 
//# sourceMappingURL=index.js.map