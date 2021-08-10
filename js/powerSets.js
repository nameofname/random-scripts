/**
 * The idea of a power set is that it's every possible subset of an array. 
 * For an array [1, 2] the sets would be : 
 *      [1], [1, 2], [2]
 * For an array [1, 2, 3] ...
 *      [1], [1, 2], [1, 2, 3], [2], [2, 3], [3], [3, 1]
 * Note that the subset cares about the order,
 * ie. it's not like a permutation, so you can't have [1, 2] and [2, 1]
 * 
 * Explanation :
 * In order to generate the power set, you have to loop over the whole array starting from 0 every time
 * ... this is because even if you have elements from the end of the array...
 * ... you have to double back to the beginning to get sets like [3, 1] --> [1, 3]
 * In order not to get duplicate sets, you have to sort the current subset and check if it's already used.
 * 
 * In this implementation I don't account for duplicate elements in the same array, ie. [1, 2, 2]
 *      my output -> [1], [1, 2], [2]
 *      alternate -> [1], [1, 2], [2], [2, 2]
 * @param {number[]} arr 
 * @returns 
 */
function powerSets(arr) {
    const sets = [];
    const used = {};

    function _build(curr) {
        const key = curr.sort((a, b) => a - b).join('-');
        if (!used[key]) {
            sets.push(curr);
            used[key] = true;
        }
        for (let i = 0; i < arr.length; i++) {
            if (!curr.includes(arr[i])) {
                _build([...curr, arr[i]]);
            }
        }
        return sets;
    }

    return _build([]);
}

console.log(powerSets([1, 2, 3]));
