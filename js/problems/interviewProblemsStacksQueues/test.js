"use strict";

const Stack = require('./Stack');
const stack = new Stack();

const Queue = require('./Queue');
const queue = new Queue();

console.log('------------------ Stacks : ');

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop());
console.log(stack.pop());


stack.push(4);
stack.push(5);

console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());

stack.push(6);
stack.push(7);

console.log(stack.pop());

console.log('------------------ Queues : ');

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

queue.enqueue(4);
queue.enqueue(5);

console.log(queue.dequeue());

queue.enqueue(6);

console.log(queue.dequeue());

