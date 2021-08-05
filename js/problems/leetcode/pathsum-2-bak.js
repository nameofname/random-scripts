// Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// Output: [[5,4,11,2],[5,8,4,5]]
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
 * @param {number} targetSum
 * @return {number[][]}
 */


/**
 * I did this version based on my understanding of a binary tree
 * where each left = idx * 2 and right = idx * 2 + 1
 */
function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

var pathSum = function(root, targetSum) {
    const successPaths = [];
    function _traverseSum_bak(currPath, sum) {
        const currIdx = (currPath.slice(-1)[0] || 0);
        sum += root[currIdx]; // ? eh ? 
        const left = currIdx * 2;
        const right = currIdx * 2 + 1;
        console.log('currrrrr', currPath, currIdx, left, right)
        if (!root[left] && !root[right] && sum === targetSum) {
            successPaths.push(currPath)
        }
        if (root[left]) _traverseSum([...currPath, left], sum);
        if (root[right]) _traverseSum([...currPath, right], sum);
    }

    function _traverseSum_Bak1(currPath, sum) {
        const idx = currPath.slice(-1)[0];
        const left = idx * 2;
        const right = idx * 2 + 1;
        const value = root[idx - 1] || 0;
        sum += value;
        console.log(idx, left, right, value, 'sum', sum)
        if (!root[left - 1] && !root[right - 1]) {
            if (sum === targetSum) {
                successPaths.push(currPath.map(idx1 => root[idx1]))
            }
        } else {
            if (root[left - 1]) _traverseSum([ ...currPath, left], sum);
            if (root[right - 1]) _traverseSum([ ...currPath, right], sum);
        }
    }
    function _traverseSum_bak2(currPath, currIdx, sum) {
        const left = (currIdx + 1) * 2 - 1;
        const right = (currIdx + 1) * 2 + 1 - 1; // +1-1 for my own understanding...
        const value = root[currIdx] || 0;
        sum += value;
        console.log('currIdx', currIdx, 'currPath', currPath, 'left', left, 'right', right)
        // console.log(currIdx + 1, left + 1, right + 1)
        if (sum === targetSum) {
            console.log('manface!', currIdx, 'currPath', root[left], root[right])
        }
        if (!root[left] && !root[right]) {
            console.log('TESTING', currIdx, left, right)
            if (sum === targetSum) {
                console.log('TESTINGGGGGGGG', currIdx)
                successPaths.push(currPath)
            }
        } else {
            if (root[left]) _traverseSum([ ...currPath, root[left]], left, sum);
            if (root[right]) _traverseSum([ ...currPath, root[right]], right, sum);
        }
    }


    function TreeNode(val, left, right) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
    // _traverseSum([ root[0] ], 0, 0);
    // return successPaths;

    // function _binaryTree(x) {
        // console.log('val', val)
        // if (val === undefined) return;
        // if (val !== null) {
        //     const leftVal = root.shift();
        //     const rightVal = root.shift();
        //     return new TreeNode(val, _binaryTree(leftVal), _binaryTree(rightVal));
        // } else {
        //     return new TreeNode(val)
        // }
    // }

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

console.log(pathSum([5,4,8,11,null,13,4,7,2,null,null,5,1], 22))


/**

1 
2 - 3
4 5 - 6 7

so...
left = n * 2
right = n * 2 + 1
parent = Math.floor(n / 2)


is there a better way to do this ? 
we have an array like [1 ... N] 
so we should be able to just use the indexes as well as the values from the same array
but how are we doing that ? 
how do we maintain the current path ? 
i guess... that's kind of what im doing.
iiiii see 
we don't need the current path of indexes
just the current path of numbers from the root
then we just pass the current idex
either the left or right
as currIdx
to the recursion. 

 */