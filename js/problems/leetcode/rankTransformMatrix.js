/**
 * THIS SOLUTION DOES NOT WORK. I'M COMMITTING AS A CHECK POINT DO NOT READ DON'T LOOK ITS BAD! !! ! ! 
 * @param {number[][]} matrix
 * @return {number[][]}
 */
function matrixRankTransform(matrix) {
    const newMatrix = new Array(matrix.length)
    .fill(1).map(() => 
        new Array(matrix[0].length).fill(0)
    );
    let lowest = 0;

    function _plusMinus(idx1, idx2) {
        const adjacent = [
            [idx1, idx2 + 1],
            [idx1, idx2 - 1],
            [idx2 + 1, idx2],
            [idx2 - 1, idx2],
        ];
        adjacent.forEach(([a, b]) => {
            if (Array.isArray(newMatrix[a]) && newMatrix[a][b] !== undefined) {
                // let plusMinus = matrix[idx1][idx2] - matrix[a][b];
                let plusMinus = matrix[a][b] - matrix[idx1][idx2];
                if (plusMinus !== 0) {
                    plusMinus = plusMinus < 0 ? -1 : 1;
                }
                newMatrix[a][b] += plusMinus;
                lowest = lowest === undefined ? newMatrix[a][b] : lowest; 
                lowest = newMatrix[a][b] < lowest ? newMatrix[a][b] : lowest;
            }
        });
    }

    matrix.forEach((row, idx1) => {
        row.forEach((n, idx2) => {
            _plusMinus(idx1, idx2);
        });
    });

    newMatrix.forEach((row, idx1) => {
        row.forEach((n, idx2) => {
            const difference = 1 - lowest; 
            row[idx2] += difference;
        });
    });

    return newMatrix;
};

// console.log(matrixRankTransform([[1,2],[3,4]])); // [[1,2],[2,3]]
// console.log(matrixRankTransform([[7,7],[7,7]])); // [[1,1],[1,1]]
console.log(matrixRankTransform([[20,-21,14],[-19,4,19],[22,-47,24],[-19,4,19]])); // [[4,2,3],[1,3,4],[5,1,6],[1,3,4]]