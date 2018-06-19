function plusMinus(arr) {
    const start = { pos: 0, neg: 0, zer: 0};
    const sums = arr.reduce((prev, curr) => {
        if (curr < 0) {
            prev.neg++;
        } else if (curr > 0) {
            prev.pos++
        } else {
            prev.zer++;
        }
        return prev;
    }, start);

    Object.keys(sums).map(k => sums[k] / arr.length).forEach(ratio => console.log(ratio))
}

const arr = [-4, 3, -9, 0, 4, 1];

plusMinus(arr)
