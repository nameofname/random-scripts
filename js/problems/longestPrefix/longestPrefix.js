function longestCommonPrefix(strings) {
    const common = [];
    strings = strings.map(string => string.split(''));

    const shortestLength = strings.reduce((num, curr) => {
        return curr.length < num ? curr.length : num;
    }, Infinity);

    for (let i = 0; i <= shortestLength; i++) {
        let allMatch = true;
        let currLetter = null;
        strings.forEach(arr => {
            currLetter = currLetter === null ? arr[i] : currLetter;
            if (!(arr[i] === currLetter)) {
                allMatch = false;
            }
        });
        if (allMatch) {
            common.push(currLetter);
        }
    }

    return common.join('');
}


input = ["string", "strong", "straddle", "stirrup"]

console.log(longestCommonPrefix(input)) // returns "st"