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

        console.log('playerA', playerA)
        console.log('playerB', playerB)

        const leftOuter = piles[0];
        const rightOuter = piles.slice(-1)[0];
        const leftInner = (piles.length > 2) ? piles[1] : 0;
        const rightInner = (piles.length > 2) ? piles.slice(-2, -1)[0] : 0;

        let chooseLeft;
        if (piles.length === 3) {
            chooseLeft = leftOuter > rightOuter; 
        } else if (leftOuter !== leftOuter) {
            chooseLeft = leftOuter > rightOuter; 
            currOuter = chooseLeft ? leftOuter : rightOuter;
            const currInner = chooseLeft ? rightInner : leftInner; 
            if (currInner > currOuter) {
                chooseLeft = !chooseLeft;
            }
        } else {
            chooseLeft = leftInner < rightInner;
        }

        const additive = chooseLeft ? piles.shift() : piles.pop();
        (player === 'a') ? playerA += additive : playerB += additive;

        if (piles.length) {
            _playTurn(player === 'a' ? 'b' : 'a');
        }
    }

    _playTurn('a');
    return playerA > playerB;
};

console.log(stoneGame([5,3,4,5]));
// console.log(stoneGame([5,6,4,5]));
// console.log(stoneGame([5,3,4,6]));