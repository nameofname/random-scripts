"use strict";
let n = 5;
console.log(n);
// Functions : 
function adder(x, y) {
    return x + y;
}
// Union type in a function : 
// tjhe | is for union, the void means no return value
function logStrNum(message) {
    console.log(message);
}
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
