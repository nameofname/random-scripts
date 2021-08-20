const bigTree = require('./bigTree.json');
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxProduct(root) {
    const totalVal = _sum(root);
    const modder = Math.pow(10, 9) + 7;
    const leafNodes = [];
    let max = 0;

    function _sum(root) {
        let sum = 0;
        function _recurAdd(root, parent = null) {
            if (!root) {
                return;
            }
            root.parent = parent;
            sum += root.val;
            _recurAdd(root.left, root);
            _recurAdd(root.right, root);
        }
        if (!root.left && !root.right) {
            leafNodes.push(root);
        }
        _recurAdd(root);
        return sum;
    }

    _sum(root);

    // this also will not work. WTF am i doing ?
    leafNodes.forEach(leaf => {
        const total = leaf.value;
        while(leaf.parent) {
            total += leaf.parent.value;
            leaf = leaf.parent;
            product = 'fuck me';
        }
    });

    return max % modder;
}

function maxProduct_bak(root) {
    const totalVal = _sum(root);
    const modder = Math.pow(10, 9) + 7;
    let max = 0;

    // This does not work, failed attempt. I was thinking of it wrong, dumb stupid head. 
    function _findLargest(root, parent = null, currSum) {
        const newSum = parent ? currSum - parent.val : currSum;
        const product = newSum * (totalVal - newSum);
        console.log('parent', parent && parent.val, currSum, newSum, product)
        // console.log('product', product, currSum, parent && parent.val)
        if (product > max || !parent) {
            console.log('i got to here...', product, max)
            max = product;
            if (root.left) _findLargest(root.left, root, newSum);
            if (root.right) _findLargest(root.right, root, newSum);
        }
    }

    // this works, but repeatedly calling _sum makes it inefficient 
    function _findLargest_bak(root) {
        const nodeSum = _sum(root);
        const product = nodeSum * (totalVal - nodeSum);
        if (product > max) {
            max = product;
            _findLargest(root.left);
            _findLargest(root.right);
        }
    }

    function _sum(root) {
        let sum = 0;
        function _recurAdd(root) {
            if (!root) {
                return;
            }
            sum += root.val;
            _recurAdd(root.left);
            _recurAdd(root.right);
        }
        _recurAdd(root);
        return sum;
    }

    _findLargest(root.left, null, totalVal);
    // _findLargest(root.right);
    return max % modder;
}


const tree = {"val":1,"left":{"val":2,"left":{"val":4,"left":null,"right":null},"right":{"val":5,"left":null,"right":null}},"right":{"val":3,"left":{"val":6,"left":null,"right":null},"right":null}};
console.log(maxProduct(tree)); // 110
// console.log(maxProduct(bigTree)); // 763478770 (wrong answer of 6043763521071)
