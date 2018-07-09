function makeMap(arr) {
    return arr.reduce((map, curr) => {
        if (!map.get(curr)) {
            map.set(curr, 1);
        } else {
            map.set(curr, map.get(curr) + 1);
        }
        return map;
    }, new Map());
}

function checkMagazine(magArr, noteArr) {
    const magazine = makeMap(magArr);

    let allMatching = true;
    let x = 0;
    while (x < noteArr.length && allMatching) {
        if (Boolean(magazine.get(noteArr[x]))) {
            magazine.set(noteArr[x], magazine.get(noteArr[x]) - 1);
        } else {
            allMatching = false;
        }
        x++;
    }

    return allMatching ? 'Yes' : 'No';
}

// const magazine = 'give me one grand today night'.split(' ');
// const note = 'give one grand today'.split(' ');
const magazine = 'two times three is not four'.split(' ');
const note = 'two times two is four'.split(' ');

console.log(checkMagazine(magazine, note));