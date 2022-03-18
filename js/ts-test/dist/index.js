"use strict";
let n = 5;
console.log(n);
// Arrays: 
// An array can be specified to be of a certain type : 
const a1 = ['asdf', 'asdfasdf'];
const a2 = [1, 2, 3];
// Tuples : multiple types in arrays : 
const tup = [1, 'asdf'];
// Tuple array: 
const tArr = [
    [1, 'ron'],
    [2, 'danielle'],
    [3, 'harry'],
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
