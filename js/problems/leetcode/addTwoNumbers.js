/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * My first accepted answer on leet code is here, making it faster...
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * Runtime: 178 ms, faster than 29.98% of JavaScript online submissions for Add Two Numbers.
 * Memory Usage: 46.9 MB, less than 84.28% of JavaScript online submissions for Add Two Numbers.
 */
var addTwoNumbers_bak = function(l1, l2) {
    let remainder = 0;
    const firstL1 = l1;
    const firstL2  = l2;
    let first = firstL1;
    let last ;
    // console.log('lengths', l1.length, l2.length)
    while (l1 || l2) {
        const newVal = (l1 && l1.val || 0) + (l2 && l2.val || 0) + remainder;
        remainder = Math.floor(newVal / 10);
        if (l1) {
            l1.val = newVal % 10;
            last = l1;
            l1 = l1.next;        
        } else {
            last = l2;
            first = firstL2;
        }
        if (l2) {
            l2.val = newVal % 10;
            l2 = l2.next;
        }
    }
    
    if (remainder) {
        last.next = new ListNode(remainder);;
    }

    return first;
};
var addTwoNumbers = function(l1, l2) {
    let remainder = 0;
    let out;
    let curr;
    while (l1 || l2) {
        const newVal = (l1 && l1.val || 0) + (l2 && l2.val || 0) + remainder;
        remainder = Math.floor(newVal / 10);
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
        const n = new ListNode(newVal % 10)
        out = out || n;
        if (curr) {
            curr.next = n;
        }
        curr = n;
    }
    
    if (remainder) {
        curr.next = new ListNode(remainder);;
    }

    return out;
};