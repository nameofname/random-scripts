// https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/RM1BDv71V60
/**
 * Example of dynamic programming problem
 * Given 2 arrays of equal length for weight and profit, and a max weight of C, 
 * pick a subset of the items that will yeild the largest profit, 
 * and have a weight less than or equal to C
 * 
 * ie. which items would you put in your knapsack with limited capacity to be able 
 * to carry the most total profit? 
 * 2:02, 2:47 - time spent figuring out power set ... 
 */

function knapsack(weights, profits, capacity) {
    let maxProfit = 0;
    const memo = new Map();
    // const subSets = [];

    function _findSet(key, stem, remainder) {
        // const stemSum = stem.reduce((a,c) => a + c, 0);
        // if (stemSum > capacity) {
        //     return;
        // }
        if (!remainder.length || memo.get(key)) {
            memo.set(key, stem);
            console.log('dont continue,', stem, remainder);
            return;
        }

        memo.set(key, stem);

        // now generate all subsets including stem
        for (let i in remainder) {
            const r = remainder[i];
            const newStem = [...stem, r];
            const newRemainder = remainder.filter((e, idx) => idx != i);
            const newKey = newStem.sort((a,b) => a - b).join('-');
            console.log('find new?', newKey, newStem, newRemainder);
            if (!memo.get(newKey)) {
                console.log('yes');
                _findSet(newKey, newStem, newRemainder);
            }
        }

    }

    _findSet('', [], weights);
    return Array.from(memo.values());
    return maxProfit; // TODO ! return the set.
}

// console.log(knapsack([2, 3, 1, 4], [4, 5, 3, 7], 5));
console.log(knapsack([1, 2, 3], [4, 5, 3, 7], 5));