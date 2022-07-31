// https://www.careercup.com/question?id=5735119795519488
// 9:24

function maxCards(hand) {
    hand.sort((a, b) => a[1] - b[1]);
    let max = 0;
    const used = new Map();

    function _check(idx, itars) {
        if (used.has(idx)) return;
        used.set(idx, true);
        max = Math.max(max, itars);
        const card = hand[idx];
        const remainder = hand.slice(idx + 1, hand.length);
        remainder.forEach((rc, idx1) => {
            if (card[0] === rc[0] || card[1] === rc[1]) {
                _check(idx + idx1 + 1, itars + 1);
            }
        });
    }

    for (let i = 0; i < hand.length; i++) {
        _check(i, 1);
    }
    return max;
}

console.log('res', maxCards([['H', 3], ['H', 4], ['S', 4], ['D', 5], ['D', 1]]));
// returns 3 as follows: (H,3)-->(H,4)-->(S,4)

//  [['D', 1], ['H', 3], ['H', 4], ['S', 4], ['D', 5]]