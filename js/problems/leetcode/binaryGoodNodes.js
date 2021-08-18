const input = {"val":2,"left":{"val":-2,"left":{"val":2,"left":null,"right":{"val":0,"left":null,"right":{"val":5,"left":null,"right":null}}},"right":{"val":-2,"left":null,"right":{"val":1,"left":null,"right":null}}},"right":{"val":-5,"left":{"val":4,"left":null,"right":null},"right":{"val":-1,"left":{"val":2,"left":{"val":1,"left":null,"right":{"val":3,"left":{"val":2,"left":null,"right":{"val":-3,"left":null,"right":null}},"right":{"val":-4,"left":null,"right":null}}},"right":{"val":3,"left":null,"right":{"val":-5,"left":null,"right":null}}},"right":{"val":-1,"left":null,"right":null}}}}

/**
 * Problem : 
 * Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.
 * Return the number of good nodes in the binary tree.
 * 
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
 function goodNodes(root) {
    let good = 0;
    function _seek(root, pathLargest) {
        let nextLargest = pathLargest;
        if (root.val >= pathLargest) {
            good++;
            nextLargest = root.val;
        }
        [root.left, root.right].forEach(node => {
            if (node !== null) {
                _seek(node, nextLargest);
            }
        });
    }
    _seek(root, root.val);
    return good;
}
console.log(goodNodes(input));