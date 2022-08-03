/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 function coinChange(coins, amount) {
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


console.log(coinChange([3,7,405,436], 8839));