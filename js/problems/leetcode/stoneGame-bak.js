/**
 * @param {number[]} piles
 * @return {boolean}
 */

        // so now decide what to take based on how much you will get, and how much you'll expose to your opponent.
        // is it more important to take more for yourself ? not if you'll expose even more to your opponent
        // let decision;
        // let gained;
        // let opponentGain;
        // let chooseLeft = false;







        // if (leftOuter > rightOuter) {
        //     chooseLeft = leftOuter >= leftInner;
        // } else if (rightOuter > leftOuter) {
        //     chooseLeft = rightOuter >= rightInner;
        // }
        // if (chooseLeft === undefined) {
        //     chooseLeft 
        // }


        // const leftAdvantage = leftOuter - (leftInner > rightOuter ? leftInner : rightOuter);
        // const rightAdvantage = rightOuter - (rightInner > leftOuter ? rightInner : leftOuter);

        // console.log('what you gonna do?', leftAdvantage, rightAdvantage)
        // let hand;
        // if (leftAdvantage > rightAdvantage) {
        //     hand = piles.shift(); 
        // } else {
        //     hand = piles.pop();
        // }
        // if (player === 'a') {
        //     playerA += hand;
        // } else {
        //     playerB += hand;
        // }



var stoneGame = function(piles) {
    let playerA = 0;
    let playerB = 0;

    function _playTurn(player) {
        console.log('playerA', playerA)
        console.log('playerB', playerB)
        const leftOuter = piles[0];
        const rightOuter = piles.slice(-1)[0];
        let leftInner = 0;
        let rightInner = 0;
        if (piles.length > 2) {
            leftInner = piles[1];
            rightInner = piles.slice(-2, -1)[0];
        }

        let chooseLeft;
        if (leftOuter !== leftOuter) {
            chooseLeft = leftOuter > rightOuter; 
            currOuter = chooseLeft ? leftOuter : rightOuter;
            const currInner = chooseLeft ? rightInner : leftInner; 
            if (currInner > currOuter) {
                chooseLeft = !chooseLeft;
            }
        } else {
            chooseLeft = leftInner < rightInner;
        }
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