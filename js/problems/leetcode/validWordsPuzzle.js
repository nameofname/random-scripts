/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
function findNumOfValidWords_bak(words, puzzles) {
    const puzzleMap = puzzles.reduce((acc, curr) => {
        acc[curr] = curr.split('').reduce((a, c) => {
            return Object.assign(a, {[c]: true});
        }, {});
        return acc;
    }, {});

    // return puzzleMap;
    return words.map(word => {
        console.log(word)
        let int = 0;
        for (puzzle of puzzles) {
            const wordArr = word.split('');
            if (wordArr.shift() === puzzle[0]) {
                // letterCheck = word.split('').reduce()
                let letterCheck = true;
                while (letterCheck && wordArr.length) {
                    if (!puzzleMap[puzzle][wordArr.shift()]) {
                        letterCheck = false;
                    }
                }
                if (letterCheck) {
                    int++;
                }
            }
        }
        return int;
    });
};

function findNumOfValidWords(words, puzzles) {
    return puzzles.map(puzzle => {
        const map = puzzle.split('').reduce((a, c) => {
            return Object.assign(a, {[c]: true});
        }, {});
        return words.reduce((count, word) => {
            const wordArr = word.split('');
            if (wordArr.includes(puzzle[0])) {
                let letterCheck = true;
                while (letterCheck && wordArr.length) {
                    if (!map[wordArr.shift()]) {
                        letterCheck = false;
                    }
                }
                if (letterCheck) {
                    ++count;
                }
            }
            return count;
        }, 0);
    });
}


// console.log(findNumOfValidWords(["aaaa","asas","able","ability","actt","actor","access"], ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]));
// Output: [1,1,3,2,4,0]
console.log(findNumOfValidWords(
    ["apple","pleas","please"],
    ["aelwxyz","aelpxyz","aelpsxy","saelpxy","xaelpsy"]
));
// Output : [0,1,3,2,0]
// Not    : [0,1,1,0,0]
 