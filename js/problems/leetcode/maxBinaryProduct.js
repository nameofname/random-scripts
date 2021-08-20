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
    let max = 0;

    // this works, but repeatedly calling _sum makes it inefficient 
    function _findLargest(root) {
        const nodeSum = _sum(root);
        const product = nodeSum * (totalVal - nodeSum);
        console.log('top', nodeSum, product)
        if (product > max) {
            max = product;
        }
        if (root.left && root.right) {
            _findLargest(root.left);
            _findLargest(root.right);
        } else if (root.left || root.right) {
            let child = root.left || root.right;
            let childNodeSum;
            let childProduct;
            while (child) {
                childNodeSum = nodeSum - root.val;
                childProduct = childNodeSum * (totalVal - childNodeSum);
                console.log('1 kid', childNodeSum, childProduct)
                if (childProduct > max) {
                    max = childProduct;
                }
                if (child.left && child.right) {
                    _findLargest(child.left);
                    _findLargest(child.right);
                    child = null;
                } else {
                    root = child;
                    child = child.left || child.right;
                }
            }
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

    _findLargest(root);
    return max % modder;
}


const tree = {"val":1,"left":{"val":2,"left":{"val":4,"left":null,"right":null},"right":{"val":5,"left":null,"right":null}},"right":{"val":3,"left":{"val":6,"left":null,"right":null},"right":null}};
console.log(maxProduct(tree)); // 110
console.log(maxProduct(bigTree)); // 763478770 (wrong answer of 6043763521071)
