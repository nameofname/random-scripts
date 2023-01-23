function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

function arrayToLinkedList(arr) {
    if (!Array.isArray(arr)) {
        throw Error('Invalid argument for arrayToLinkedList, only accepts arrays');
    }
    let currNode;
    while (arr.length) {
        const n = new ListNode(arr.pop(), currNode);
        currNode = n;
    }
    return currNode;
}

function linkedListToArray(head) {
    const arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next
    }
    return arr;
}

module.exports = {
    ListNode,
    arrayToLinkedList,
    linkedListToArray
}