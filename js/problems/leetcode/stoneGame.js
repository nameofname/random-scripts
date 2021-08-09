/**
 * THIS DOES NOT WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * THE ANSWER IS ALWAYS RETURN TRUE. 
 * If you carefully read the question, you can realize that the return value will always be true. 
 * I got close with this implementation, but failed some test cases.
 * 
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function(piles) {
    let playerA = 0;
    let playerB = 0;

    function _playTurn(player) {

        const leftOuter = piles[0];
        const rightOuter = piles.slice(-1)[0];
        const leftInner = (piles.length > 2) ? piles[1] : 0;
        const rightInner = (piles.length > 2) ? piles.slice(-2, -1)[0] : 0;

        let chooseLeft;
        const advantageLeft = leftOuter - leftInner;
        const advantageRight = rightOuter - rightInner;
        if (advantageLeft === advantageRight) {
            chooseLeft = leftOuter > rightOuter;
        } else {
            chooseLeft = advantageLeft > advantageRight; 
        }

        const additive = chooseLeft ? piles.shift() : piles.pop();
        (player === 'a') ? playerA += additive : playerB += additive;

        console.log('additive', additive);
        console.log('playerA', playerA);
        console.log('playerB', playerB);

        if (piles.length) {
            _playTurn(player === 'a' ? 'b' : 'a');
        }
    }

    _playTurn('a');
    return playerA > playerB;
};

// console.log(stoneGame([5,3,4,5])); // true
// console.log(stoneGame([3,7,2,3])); // true 
// console.log(stoneGame([3,2,10,4])); // true
// console.log(stoneGame([8,9,7,6,7,6])); // true
console.log(stoneGame([6,3,9,9,3,8,8,7])); // true
// NEW LOGIC to deal with the case [8,9,7,6,7,6]
// a - 8 7 7 = 22
// b - 9 6 6 = 21
// advantageLeft = leftOuter - leftInner 
// 