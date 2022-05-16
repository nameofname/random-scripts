// find the first non-repeated character of a string
function firstNonRepeatedChar(s) {
    const first = s[0];
    for (char of s) {
        if (char !== first) {
            return char;
        }
    }
}

console.log(firstNonRepeatedChar('aaaaaabaaa'))