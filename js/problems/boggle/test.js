/**
 * I've done this problem so many times, I need tests for it :|
 */

export default function test(board, word, matches) {
    console.log(`Testing matches for ${word}`, word, board, matches);
    const foundWords = [];
    for (const match of matches) {
        const m = new Map();
        let currWord = '';
        for (const pair of match) {
            const [y, x] = pair;
            const key = `${y}-${x}`;
            // test 1 - there are no duplicate pairs in each match
            if (m.has(key)) {
                throw new Error('duplicate pair in match');
            } else {
                m.set(key, true);
            }
            // now we output all of the found words 
            try {
                currWord += board[y][x];
            } catch (e) {
                console.error('Error accessing board at ', y, x, e);
                throw e;
            }
        }
        foundWords.push(currWord);
    }
    console.log(foundWords);
    foundWords.forEach(foundWord => {
        if (foundWord !== word) {
            throw new Error(`Bad match, ${foundWord} !== ${word}`);
        }
    })
}