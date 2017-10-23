"use strict";

const Queue = require('./Queue');
const queue = new Queue();

queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.pop());
console.log(queue.pop());


queue.push(4);
queue.push(5);

console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());

queue.push(6);
queue.push(7);

console.log(queue.pop());

