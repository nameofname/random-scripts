/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const levels = [];

    function buildLevels(root, level) {
        if (root === null) return;
        if (!Array.isArray(levels[level])) {
            levels[level] = [];
        }
        const currLevel = levels[level];
        currLevel.push(root.val);
        const nextLevel = ++level;

        if (root.children && root.children.length) {
            root.children.forEach(child => buildLevels(child, nextLevel));
        }
    } 

    buildLevels(root, 0);
    return levels;
};

const imput = {"val":1,"children":[{"val":3,"children":[{"val":5,"children":[]},{"val":6,"children":[]}]},{"val":2,"children":[]},{"val":4,"children":[]}]};

console.log(levelOrder(imput)); // [[1],[3,2,4],[5,6]]