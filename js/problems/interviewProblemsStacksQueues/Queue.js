"use strict";

// 3.1 Implement enqueue and dequeue using only two stacks

class QueueNode {
    constructor({value, next}) {
        this.value = value;
        this.next = next;
    }
}

class Queue {
    constructor () {
        this.length = 0;
        this.head = null;
    }

    push(val) {
        const newHead = new QueueNode({ value: val, next: this.head});
        this.head = newHead;
    }

    pop() {
        if (!this.head) {
            return undefined;
        }
        const val = this.head.value;
        this.head = this.head.next;
        return val;
    }
}


module.exports = Queue;
