/**
 * https://leetcode.com/problems/merge-two-sorted-lists/submissions/
 * 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 function mergeTwoLists(list1, list2) {
    if (!list1 && !list2) {
        return null;
    }
    const out = new ListNode(null, null);
    let root = out;
    while (list1 || list2) {
        if ((list1 && !list2) || (list1 && list2 && list1.val < list2.val)) {
            root.val = list1.val;
            list1 = list1.next;
        } else if (list2) {
            root.val = list2.val;
            list2 = list2.next;
        }
        if (list1 || list2) {
            root.next = new ListNode();
        }
        root = root.next;
    }
    return out;
};