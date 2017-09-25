// two words are anagrams if they can be spelled using the same set of letters
// 'deal' and 'lead' are anagrams

// [deal, lead, eh, he, aled, a, not]

// [[deal, lead, aled], [eh, he], [a], [not]]

const findAnagrams = arr => {

    const map = {};

    arr.forEach(word => {
        const key = word.split('').sort().join('');
        if (map[key]) {
            map[key].push(word);
        } else {
            map[key] = [word];
        }
    });

    return Object.keys(map)
        .reduce((prev, k) => {
            return [...prev, map[k]];
        }, []);
};

module.exports = findAnagrams;
