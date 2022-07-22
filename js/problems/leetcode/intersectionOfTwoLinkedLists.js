// https://leetcode.com/problems/intersection-of-two-linked-lists/
// this one seems really super easy to me, i feel like it's a trick
// but it's marked as easy so hey what do i know! 
// maybe there are languages where you can't key a map on any arbitrary thing
// but in JS you can just throw it into a map

function getIntersectionNode(haedA, headB) {
    const m = new Map();
    function _check(node) {
        if (!node) return false;
        const ret = m.has(node);
        m.set(node, true);
        return ret;
    }
    while (headA || headB) {
        if (_check(headA)) return headA;
        if (_check(headB)) return headB;
        headA = headA.next;
        headB = headB.next;
    }
    return 0;
}