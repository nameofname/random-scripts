/**
function alphabetize(alphabet: string, word: string): string;
alphabetize('nab', 'banana') === 'nnaaab';
Given a custom alphabet and a word, sort the word by the custom alphabet.
// 1:44 - 1:47
 */
function alphabetize(alphabet, string) {
    const alphaMap = {};
    for (i in alphabet) {
        alphaMap[alphabet[i]] = i;
    }
    const stringArr = string.split('');
    return stringArr.sort((a, b) => alphaMap[a] - alphaMap[b]).join('');
}

console.log(alphabetize('nab', 'banana'));