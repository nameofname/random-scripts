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
    const modder = Math.pow(10, 9) + 7;
    let max = 0;
    const tuples = []

    function _sum(root) {
        if (!root) {
            return 0;
        }
        if (!root.left && !root.right) {
            return root.val;
        } else {
            const left = _sum(root.left);
            const right = _sum(root.right);
            tuples.push([left, right]);
            return root.val + left + right;
        }
    }

    const totalVal = _sum(root);
    for (let i = 0; i < tuples.length; i++) {
        const [left, right] = tuples[i];
        const productA = left * (totalVal - left);
        const productB = right * (totalVal - right);
        const largest = productA > productB ? productA : productB;
        if (largest > max) {
            max = largest;
        }
    }

    return max % modder;
}


const tree = {"val":1,"left":{"val":2,"left":{"val":4,"left":null,"right":null},"right":{"val":5,"left":null,"right":null}},"right":{"val":3,"left":{"val":6,"left":null,"right":null},"right":null}};
const tree1 = {"val":6,"left":{"val":10,"left":null,"right":{"val":6,"left":{"val":1,"left":{"val":1,"left":null,"right":null},"right":null},"right":null}},"right":null};
const tree2 = {"val":284,"left":{"val":499,"left":{"val":431,"left":{"val":156,"left":null,"right":{"val":934,"left":null,"right":null}},"right":{"val":374,"left":{"val":705,"left":{"val":857,"left":{"val":392,"left":{"val":658,"left":{"val":401,"left":{"val":82,"left":null,"right":null},"right":{"val":434,"left":null,"right":null}},"right":null},"right":{"val":944,"left":null,"right":null}},"right":{"val":383,"left":{"val":638,"left":{"val":442,"left":{"val":723,"left":{"val":490,"left":null,"right":null},"right":{"val":928,"left":{"val":666,"left":null,"right":null},"right":null}},"right":{"val":377,"left":{"val":353,"left":{"val":246,"left":null,"right":null},"right":null},"right":{"val":510,"left":null,"right":null}}},"right":{"val":472,"left":{"val":977,"left":null,"right":null},"right":null}},"right":null}},"right":{"val":730,"left":{"val":968,"left":null,"right":null},"right":{"val":637,"left":null,"right":null}}},"right":{"val":966,"left":null,"right":{"val":3,"left":{"val":420,"left":null,"right":null},"right":null}}}},"right":{"val":754,"left":{"val":215,"left":{"val":295,"left":{"val":377,"left":{"val":89,"left":{"val":820,"left":{"val":835,"left":{"val":509,"left":{"val":12,"left":null,"right":{"val":499,"left":null,"right":{"val":798,"left":null,"right":null}}},"right":{"val":984,"left":null,"right":null}},"right":null},"right":{"val":846,"left":null,"right":{"val":479,"left":null,"right":null}}},"right":{"val":158,"left":{"val":293,"left":null,"right":null},"right":{"val":834,"left":null,"right":{"val":790,"left":null,"right":null}}}},"right":null},"right":{"val":884,"left":{"val":978,"left":{"val":591,"left":{"val":214,"left":null,"right":null},"right":{"val":527,"left":null,"right":{"val":204,"left":null,"right":null}}},"right":null},"right":null}},"right":{"val":758,"left":{"val":588,"left":{"val":416,"left":null,"right":null},"right":{"val":981,"left":null,"right":null}},"right":{"val":434,"left":{"val":34,"left":null,"right":null},"right":null}}},"right":{"val":676,"left":{"val":906,"left":null,"right":null},"right":{"val":324,"left":null,"right":{"val":457,"left":{"val":660,"left":{"val":41,"left":{"val":590,"left":null,"right":null},"right":{"val":172,"left":null,"right":{"val":42,"left":null,"right":null}}},"right":{"val":758,"left":{"val":672,"left":null,"right":null},"right":{"val":811,"left":null,"right":null}}},"right":{"val":761,"left":null,"right":{"val":827,"left":null,"right":null}}}}}}},"right":{"val":300,"left":{"val":372,"left":{"val":131,"left":null,"right":{"val":718,"left":null,"right":null}},"right":{"val":970,"left":{"val":439,"left":{"val":193,"left":null,"right":null},"right":{"val":627,"left":{"val":854,"left":{"val":991,"left":null,"right":{"val":78,"left":null,"right":null}},"right":{"val":425,"left":null,"right":null}},"right":{"val":997,"left":{"val":171,"left":null,"right":{"val":15,"left":null,"right":{"val":685,"left":{"val":386,"left":null,"right":null},"right":{"val":119,"left":null,"right":null}}}},"right":{"val":756,"left":{"val":13,"left":{"val":133,"left":{"val":969,"left":null,"right":{"val":559,"left":null,"right":null}},"right":null},"right":null},"right":null}}}},"right":null}},"right":null}};
// console.log(maxProduct(tree)); // 110
// console.log(maxProduct(tree1)); // 128 (wrong answer of 140)
console.log(maxProduct(tree2)); // 692443033 (wrong answer of 615375369)
// console.log(maxProduct(bigTree)); // 763478770 (wrong answer of 6043763521071)
