
function diagonalDifference(a) {
    let res = 0;
    a.forEach((arr, idx) => {
        const left = arr[idx];
        const right = arr[arr.length - 1 - idx];
        console.log(left, right)
        res += left - right;
    });
    return Math.abs(res);
}

const matrix = [
    [11, 2, 4],
    [4, 5, 6],
    [10, 8, -12],

]

console.log(diagonalDifference(matrix))
