/**
 * @param {number} n
 * @return {string}
 9:42 - 9:56 when I totally fucking misunderstood the problem...
 9:57 - 10:31
 */
 function countAndSay(n) {
    let out = [];

    function recur(int) {
        if (int === 1) {
            out = [1];
            return recur(int + 1);
        } else if (int === n + 1) {
            return;
        }

        // now convert out to count/say string :
        const first = out[0], newOut = [];
        let currTest = out[0], tmpCount = 0;
        while (typeof out[0] === 'number') {
            const curr = out.shift();
            if (curr === currTest) {
                ++tmpCount;
                if (out[0] !== currTest) {
                    newOut.push(tmpCount, currTest);
                    currTest = out[0];
                    tmpCount = 0;
                }
            }
        }

        out = newOut;
        return recur(int + 1);
    }

    recur(1);
    return out.join('');
};