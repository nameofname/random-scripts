/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 2025 solution - beats 100% in complexity. 
 * I was surprised this was so much faster, the problem is marked as easy, I figure others would have
 * performant solutions as well.. 
 */
var mergeTwoLists = function(list1, list2) {
    if (list1 === null && list2 === null) return list1;
    let curr, res;
    while (list1 !== null || list2 !== null) {
        const last = curr;
        if (list2 === null || (list1 !== null && list1.val < list2.val)) {
            curr = list1;
            list1 = list1.next;
        } else {
            curr = list2;
            list2 = list2.next;
        }
        if (last) {
            last.next = curr;
        }
        if (!res) {
            res = curr;
        }
    }
    curr.next = null;
    return res;
};