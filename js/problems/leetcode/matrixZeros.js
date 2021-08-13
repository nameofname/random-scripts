/**
 * 1:09 - 1:29
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix) {
    const seen = {};
    const height = matrix.length;
    const width = matrix[0].length;

    function _setZeroes(idx1, idx2) {
        for (let h = 0; h < height; h++) {
            matrix[h][idx2] = 0;
        }
        for (let w = 0; w < width; w++) {
            matrix[idx1][w] = 0;
        }
    }

    const pairsToFlip = [];
    matrix.forEach((row, idx1) => {
        row.forEach((n, idx2) => {
            if (n === 0) {
                pairsToFlip.push([idx1, idx2]);
            }
        });
    });
    pairsToFlip.forEach(([a, b]) => _setZeroes(a, b));

    return matrix;
};

console.log(setZeroes([[1,1,1],[1,0,1],[1,1,1]])); //[[1,0,1],[0,0,0],[1,0,1]]
console.log(setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]])); //[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
