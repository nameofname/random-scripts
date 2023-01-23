const { arrayToLinkedList, linkedListToArray } = require('./helpers/LinkedLists');

function swapPairs(head) {
    // if (!head) return head;
    let ret;
    let prevHead;
    while(head) {
        ret = ret || head.next || head;
        swap(head, head.next, prevHead);
        prevHead = head;
        head = head.next;
    }
    return ret;
}

function swap(a, b, prev) {
    a.next = b?.next || null;
    if (b) b.next = a;
    if (prev && b) prev.next = b;
}

// console.log(linkedListToArray(swapPairs(arrayToLinkedList([1,2,3,4,5,6]))));
// console.log(linkedListToArray(swapPairs(arrayToLinkedList([1]))));
console.log(swapPairs(arrayToLinkedList([])));
// console.log(linkedListToArray(swapPairs(arrayToLinkedList([1,2,3,4,5]))));
