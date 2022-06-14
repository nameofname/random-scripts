// 6:13 - 6:14
function alphabetize(alphabet, word) {
    const out = [];
    for (letter of word) {
        const idx = alphabet.indexOf(letter);
        out[idx] = out[idx] || '';
        out[idx] += letter;
    }
    return out.join('');
}
// 6:06 - 6:11
function alphabetize_2(alphabet, word) {
    const map = new Map();
    let s = '';
    for (letter of word) {
        map.set(letter, (map.get(letter) || 0) + 1);
    }
    for (letter of alphabet) {
        s += new Array(map.get(letter)).fill(letter).join('');
    }
    return s;
}

// /**
// function alphabetize(alphabet: string, word: string): string;
// alphabetize('nab', 'banana') === 'nnaaab';
// Given a custom alphabet and a word, sort the word by the custom alphabet.
// // 1:44 - 1:47
//  */
function alphabetize_1(alphabet, string) {
    const alphaMap = {};
    for (i in alphabet) {
        alphaMap[alphabet[i]] = i;
    }
    const stringArr = string.split('');
    return stringArr.sort((a, b) => alphaMap[a] - alphaMap[b]).join('');
}

console.log(alphabetize('nab', 'banana')); // 'nnaaab';
