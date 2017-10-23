"use strict";


class StackNode {
    constructor({value, next}) {
        this.value = value;
        this.next = next;
    }
}

// first in last out
class Stack {
    constructor () {
        this.length = 0; // TODO
        this.head = null;
    }

    push(val) {
        const newHead = new StackNode({ value: val, next: this.head});
        this.head = newHead;
        this.length++;
    }

    pop() {
        if (!this.head) {
            return undefined;
        }
        const val = this.head.value;
        this.head = this.head.next;
        this.length--;
        return val;
    }
}


module.exports = Stack;
