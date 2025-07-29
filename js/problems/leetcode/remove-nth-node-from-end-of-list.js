const { arrayToLinkedList, linkedListToArray } = require('./helpers/LinkedLists');

/**
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    const orig = head;
    while (head.next) {
        const prev = head;
        head = head.next;
        head.prev = prev;
    }
    while (n > 1) {
        head = head.prev;
        --n;
    }
    if (!head.next && !head.prev) {
        return null;
    }
    if (head.prev) {
        head.prev.next = head.next;
    } else {
        return head.next;
    }
    return orig;
};


/**
 * I got this to work in a single pass... 
 * Beats 100% of entries in time complexity
 * I do one loop over the whole array and store each node in a map...
 * Then I get the Nth from the end and splice it out.
 */
var removeNthFromEndNew = function (head, n) {
    let m = new Map(), itar = 1, first = head;
    while (head) {
        m.set(itar, head);
        ++itar;
        head = head.next;
    }
    const removeIdx = itar - n - 1;
    if (removeIdx === 0) {
        return first.next;
    }
    const spliceNode = m.get(removeIdx);
    console.log('asdf', m, spliceNode, itar, itar - n - 1)
    spliceNode.next = spliceNode.next.next;
    return first;
}

console.log(
    linkedListToArray(
        removeNthFromEndNew(
            // arrayToLinkedList([1, 2, 3, 4, 5, 6, 7]), 2
            arrayToLinkedList([1, 2]), 1
        )
    )
);

