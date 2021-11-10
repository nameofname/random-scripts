const { words, puzzles } = require('./bigInput.json');

function findNumOfValidWords(words, puzzles) {
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


// console.log(findNumOfValidWords(["aaaa","asas","able","ability","actt","actor","access"], ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]));
// Output: [1,1,3,2,4,0]
console.log(findNumOfValidWords(
    ["apple","pleas","please"],
    ["aelwxyz","aelpxyz","aelpsxy","saelpxy","xaelpsy"]
));
// Output : [0,1,3,2,0]

console.log(findNumOfValidWords(words, puzzles));
// Should complete in time

 