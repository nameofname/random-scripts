/**
if one of the 2 outer has the advantage, assume you are going to pick that
unless picking it would expose a bigger number

else if the outer 2 are equal, 
then you pick the one that exposes the smaller inner 

there's a special case for if there are 3 piles left
then you just choose the biggest outer, because either way you expose the same inner 

if the 2 inner are also the same…
then you can kind of pick at random… i think. you could try to go down a level to decide… 
but let's punt on that and do random for now. 



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