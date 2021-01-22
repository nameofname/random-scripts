function dedupe(arrays) {
    const map = {};
    return arrays.reduce((combined, array) => {
        array.forEach(int => {
            if (!map[int]) {
                combined.push(int)
            }
            map[int] = true;
        });
        return combined;
    }, []);
}

// const arrays = [ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 5, 6, 6 ], [ 7, 8, 9 ] ];
// console.log(dedupe(arrays))

module.exports = dedupe;
