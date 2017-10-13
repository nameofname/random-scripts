/*
  Given the 2 dimensional array below, please write a program that
  will identify the biggest cluster of contiguous 1's,
  and then changes each of those 1's from the biggest cluster
  to a zero.
 
  Contiguous is defined as being above, below, to the right or to 
  the left. Diagonal 1's are not considered contiguous.
*/

var arr = [
	
	[0,0,0,0,0,0,1,1,1],
	[0,1,1,0,0,0,0,1,0],
	[1,1,0,0,0,0,0,0,0],
	[0,0,0,1,1,1,1,0,0],
	[1,0,0,0,0,0,1,1,0],
	[0,1,1,1,1,0,0,0,0],
	[0,0,1,0,0,0,0,0,0]

];




const findClusterBak = matrix => {

    const usedMap = {};
    const width = matrix[0].length - 1;
    const height = matrix.length - 1;

    const clusterRecur = (matrix, x, y, counter) => {

        const currKey = `${y}${x}`;
        const isOne = matrix[y][x] === 1;
        console.log('clusterRecur', currKey);
        if (usedMap[currKey]) {
            return 0; 
        }

        usedMap[`${y}${x}`] = true;

        if (isOne) {
            counter++;
        }

        const coordinatesArr = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];

        for (let i = 0; i < coordinatesArr.length - 1; i++) {

            const currX = coordinatesArr[i][0];
            const currY = coordinatesArr[i][1];
            const alreadyUsed = usedMap[`${currY}${currX}`];
            const xOutOfRange = (currX < 0 || currX > width);
            const yOutOfRange = (currY < 0 || currY > height);

            const innerKey = `${currY}${currX}`;
            console.log('innerKey', innerKey);
            // usedMap[innerKey] = true;
            // console.log(currX, currY)
            if (xOutOfRange || yOutOfRange || alreadyUsed) {
                continue;
            } else if (matrix[currY][currX] === 1) {
                // console.log('inner for', counter, currX, currY, matrix[currY])
                ++counter;
                const recurOutput = clusterRecur(matrix, currX, currY, counter);
                console.log('recurOutput', counter, recurOutput);
                counter += recurOutput;
            }
        }

        return counter;
    };

    let largest = 0;
    let largestCoordinates; 
    matrix.forEach((arr, y) => {
        arr.forEach((int, x) => {
            const clusterSize = clusterRecur(matrix, x, y, matrix[y][x]);
            largest = clusterSize > largest ? clusterSize : largest;
            if (clusterSize > largest) {
                largestCoordinates = [x, y];
            }
            // console.log('clusterSize', clusterSize);
        });
    });

    // another hypothetical recursive function
    // flipLargestCluster(largestCoordinates);

    console.log('largest', largest);
};



// console.log(findCluster(arr));

const replaceLargestCluster = matrix => {

    let largest = 0;
    let largestCoordinates;
    let usedMap = {};

    const clusterIterator = (matrix, y, x, callback) => {

        const width = matrix[0].length - 1;
        const height = matrix.length - 1;
        const inRange = (y > -1) && (x > -1) && (y <= height) && (x <= width);
        const coordinateKey = `${y}-${x}`;
        const isUsed = usedMap[coordinateKey] === true;

        usedMap[coordinateKey] = true;

        if (!inRange || isUsed) {
            return;
        }

        const isOne = matrix[y][x] === 1;

        if (isOne) {
            callback(matrix, y, x);

            const adjacentCoordinates = [[y, x - 1], [y, x + 1], [y - 1, x], [y + 1, x]];

            for (let i = 0; i < adjacentCoordinates.length; i++) {
                const currY = adjacentCoordinates[i][0];
                const currX = adjacentCoordinates[i][1];
                clusterIterator(matrix, currY, currX, callback);
            }
        }
    };


    matrix.forEach((arr, y) => {
        arr.forEach((int, x) => {
            let clusterSize = 0;
            clusterIterator(matrix, y, x, () => {
                clusterSize++;
            });
            if (clusterSize > largest) {
                largest = clusterSize;
                largestCoordinates = [y, x];
            }
        });
    });

    usedMap = {};

    clusterIterator(matrix, largestCoordinates[0], largestCoordinates[1], (mx, y, x) => {
        mx[y][x] = 0;
    });

    return matrix;
};

console.log(arr);
console.log(replaceLargestCluster(arr));
