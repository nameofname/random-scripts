const { words, puzzles } = require('./bigInput.json');

/**
 * This approach works but it does not perform
 * So I need to re-do with bitwise masking
 * Basically it's easy ... see below
 */
function findNumOfValidWords_bak(words, puzzles) {
    const wordMaps = words.reduce((map, word) => {
        let count = 0;
        map[word] = word.split('').reduce((a, c) => {
            if (!a[c]) ++count;
            return Object.assign(a, {[c]: true});
        }, {});
        map[word].count = count;
        return map;
    }, {});

    return puzzles.map(puzzle => {
        const puzzleArr = puzzle.split('');
        return words.reduce((count, word) => {
            const wordMap = wordMaps[word];
            let currCount = 0;
            if (!wordMap[puzzleArr[0]]) {
                return count;
            }
            for (letter of puzzleArr) {
                if (wordMap[letter]) {
                    ++currCount;
                }
            }
            if (currCount === wordMap.count) {
                ++count;
            }
            return count;
        }, 0);
    });
}

/**
Get a map of letters to numbers, 1 - 26
Use a new Array(26).fill(0).map((z, int) => ) ... char code at
then use left shift to get bit
and do a logical ... bitwise OR to make the masks 
 */
function findNumOfValidWords_bak(words, puzzles) {
    // return [1,2,3,4] // no. 

}


// console.log(findNumOfValidWords(["aaaa","asas","able","ability","actt","actor","access"], ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]));
// Output: [1,1,3,2,4,0]
console.log(findNumOfValidWords(
    ["apple","pleas","please"],
    ["aelwxyz","aelpxyz","aelpsxy","saelpxy","xaelpsy"]
));
// Output : [0,1,3,2,0]

console.log(findNumOfValidWords(words, puzzles));
// Should complete in time

 