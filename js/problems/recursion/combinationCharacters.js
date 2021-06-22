/**
 * The idea is to take in : 
 *      a set of characters
 *      an interger
 * Then you print all possible combinations of the characters which are the length of the passed int
 * It's a combination with repetition allowed
 * Note it has to be a set, or else the output can have repeated values
 */

// 12:18 - 12:34
function combinationCharacters(set, int) {
    const combos = [];

    function _combo(currArr) {
        if (currArr.length === int) {
            combos.push(currArr.join(''))
        } else {
            for (val of set.values()) {
                _combo([...currArr, val]);
            }
        }
    }

    _combo([])
    return combos;
}

console.log(combinationCharacters(new Set(['a', 'b']), 3));
