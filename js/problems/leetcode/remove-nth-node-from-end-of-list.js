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
 var removeNthFromEnd = function(head, n) {
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
    if (!head.next && ! head.prev) {
        return null;
    }
    if (head.prev) {
        head.prev.next = head.next;
    } else {
        return head.next;
    }
    return orig;
};