const itemJson = require('../../data/f_123.json');

function contains(node, searchValue) {
    if (node === searchValue) {
        return true;
    }
    if (Array.isArray(node)) {
        const arrayContains = node.reduce((prev, subNode) => {
            if (prev) return prev;
            return contains(subNode, searchValue);
        }, false);
        if (arrayContains) {
            return arrayContains;
        }
    } else if (typeof node === 'object') {
        let objectContains = false;
        Object.keys(node).forEach(key => {
            objectContains = objectContains || contains(node[key], searchValue);
        });
        if (objectContains) {
            return objectContains;
        }
    }
    return false;
}

console.log('search this item JSON for nested value of TRANSFER_ADMIN', contains(itemJson, 'TRANSFER_ADMIN'));