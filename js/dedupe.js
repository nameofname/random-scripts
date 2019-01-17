const arrays = [ [ 1, 2, 3 ], [ 1, 2, 4 ], [ 5, 6, 6 ], [ 7, 8, 9 ] ];
const map = {};
const map1 = {};
function dedupe(arrays) {
    return arrays.reduce((combined, array) => {
        array.forEach(int => {
            if (!map[int]) {
                combined.push(int)
            }
            map[int] = true;
        });
    return combined }, []);
}

const oneLiner = arrays => arrays.reduce((combined, array) => { array.forEach(int => { if (!map1[int]) { combined.push(int) } map1[int] = true; }); return combined }, []);

console.log(dedupe(arrays))
console.log(oneLiner(arrays))
