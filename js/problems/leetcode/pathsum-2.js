function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
 var pathSum = function(root, targetSum) {
    const successPaths = [];

    function _binaryTree(row, rootNode) {
        const nextRow = [];
        rootNode = rootNode || row[0];
        for (node of row) {
            if (node.val !== null) {
                const left = root.shift();
                const right = root.shift();
                if (left) {
                    node.left = new TreeNode(left);
                    nextRow.push(node.left);
                }
                if (right) {
                    node.right = new TreeNode(right);
                    nextRow.push(node.right);
                }
            }
        }
        return nextRow.length ? _binaryTree(nextRow, rootNode) : rootNode;
    }

    function sumLeafNodes(node, path, sum) {
        if (!node) {
            return;
        }
        sum += node.val;
        path = path.slice();
        path.push(node.val);
        if (!node.left && !node.right) {
            if (sum === targetSum) {
                successPaths.push(path);
            }
        } else {
            sumLeafNodes(node.left, path, sum);
            sumLeafNodes(node.right, path, sum);
        }
    }

    const tree = _binaryTree([new TreeNode(root.shift())]);
    sumLeafNodes(tree, [], 0);

    return successPaths;
};

// console.log(pathSum([5,4,8,11,null,13,4,7,2,null,null,5,1], 22))