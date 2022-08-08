/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 * This is my original solution that uses recursion
 * adding the coin value to each combo each time
 * I then use a memo map to remember combos used
 * ... the combos are of total amount and # of coins, 
 * not the specific coins used to arrive at that total
 * It's a long function, and the running time with high
 * numbers doesn't pass muster with leetcode 
 * (ie. time limit exceeded)
 */
 function coinChange_ronald(coins, amount) {
    if (amount === 0) return 0;
    const memo = new Map();
    let minCount = -1;
    let itars = 0;

    function _combine(total, coinCount) {
        // console.log('recur', total, coinCount);
        ++itars;
        const key = `${total}-${coinCount}`;
        if (
            (coinCount > minCount && minCount !== -1) ||
            (total > amount)
        ) {
            memo.set(key, -1);
            return -1;
        } else if (memo.has(key)) return memo.get(key);

        let successfulCount = -1;
        if (total === amount) successfulCount = coinCount;
        let counts = [successfulCount];
        for (let coin of coins) {
            counts.push(_combine(total + coin, coinCount + 1));
        }
        counts = counts.filter(c => c !== -1);
        const res = !counts.length ? -1 : Math.min(...counts);
        memo.set(key, res);
        minCount = res !== -1 ? Math.min(minCount, res) : minCount;
        return res;
    }

    _combine(0, 0);
    console.log('got it bitch', itars, minCount)
    return minCount;
}


// From here : 
// https://leetcode.com/problems/coin-change/discuss/2165151/DP-top-down-and-bottom-up-solutions-with-comments
var coinChange = function(coins, amount) {
    
    // default value to fill in the array, use any number bigger than amount
    // as for each amount, the largest number of coins is amount / 1 = amount
    const DEFAULT = amount + 1
    // init array and fill with default value
    let dp = Array.from(Array(amount+1), (e)=>DEFAULT)
    
    // base case when amount = 0, return 0
    dp[0] = 0
    
    // loop over all states of amount, as 'a' will be equal to amount, the array length should be amount + 1
    for (let a = 0; a <= amount; a++) {
      // under each state, loop over all choices
      for (let c of coins) {
        // if amount is smaller than the choice value
        // then there is no solution so we skip the loop
        if (a - c < 0) continue
        
        // for example, when the amount is 11, 
        // we can calculate the sub problem of amount = 11 - 1, 11 - 2, 11 - 5
        // then add 1 to be the number of coins for current amount
        // so dp[a] will be calculated multiple times, for the sake of understanding
        // we use 2 variables to represent 2 fewest value
        let curFewest = dp[a]
        let subFewest = dp[a-c]
        dp[a] = Math.min(curFewest, subFewest + 1) 
        // dp[a] = Math.min(dp[a], dp[a-c] + 1) you may see this more often
      }
    }
    // if dp[amount] is the default value, that means no solution for that amount, so we return -1
    return dp[amount] === DEFAULT ? -1 : dp[amount]
  }
  

  console.log(coinChange([1,2,5], 11));
//   console.log(coinChange([1, 25, 33, 50], 66));
// console.log(coinChange([3,7,405,436], 8839)); // the hard case