"use strict";

class QueueNode {
    constructor({value, previous, next}) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}

class Queue {
    constructor () {
        this.tail = null;
        this.head = null;
    }

    enqueue(val) {
        const newHead = new QueueNode({ value: val, previous: this.head, next: null});
        if (this.head) {
            this.head.next = newHead;
        }
        if (!this.tail) {
            this.tail = newHead;
        }
        this.head = newHead;
    }

    dequeue() {
        if (!this.tail) {
            return undefined;
        }
        const val = this.tail.value;
        this.tail = this.tail.next;
        return val;
    }
}

module.exports = Queue;