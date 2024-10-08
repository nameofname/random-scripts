/**
 * @param {number[][]} grid
 * @return {number}
 * So my 2nd solution was correct
 * However not efficient enough to pass
 * I read the leet code solution
 * which includes depth first search not recursive
 * but based on a while loop
 * so trying that out. 
 * 
 * Aaaand drumroll please......
 * Works the same as my other answer (duh)
 * But I finally read the alert on the leet code editor thing, and it doesn't want me to put a function inside a loop so... 
 */
var largestIsland = function(grid) {
    let largest = 0;

    function _seek(idx1, idx2) {
        const seen = {};
        const stack = [[idx1, idx2]];

        while (stack.length) {
            const [a, b] = stack.pop();
            seen[`${a}-${b}`] = true;
            const positionsToCheck = [
                [a, b - 1],
                [a, b + 1],
                [a - 1, b],
                [a + 1, b]
            ];
            for (let [a1, b1] of positionsToCheck) {
                const inRange = (0 <= a1 && a1 < grid.length) && (0 <= b1 && b1 < grid.length);
                if (inRange && !seen[`${a1}-${b1}`] && grid[a1][b1] === 1) {
                    stack.push([a1, b1]);
                }
            }
        }
        return Object.keys(seen).length;
    }

    let seekUsed = false;
    grid.forEach((row, idx1) => {
        row.forEach((cell, idx2) => {
            if (cell !== 1) {
                seekUsed = true;
                row[idx2] = 1;
                const current = _seek(idx1, idx2);
                // console.log('found largest', current, largest)
                largest = current > largest ? current : largest;
                row[idx2] = 0; //change it back when you're done. 
            }
        });
    });

    // special case for if it's all 1s
    if (!seekUsed) {
        return grid.length * grid.length;
    }

    return largest;
}

const makeGrid = int => new Array(int).fill('x').map(() => new Array(int).fill('x').map((bla, idx) => { return Math.random() < 0.5 ? 1 : 0 }))
// const bigInput = [[1,0,1,1,0,1,0,1,0,0,0,0,1,0,0,1,1,1,0,1,0,0,1,0,1,0,0,1,1,0,1,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,1],[0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,0,0,1,1,1,1,0,0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,0,1,0,0,0],[1,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,1,1,1,1,0,0,1,1,0,1,0,0,0,0],[0,0,0,1,0,1,0,0,0,1,1,0,1,1,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,1,1,1,1,1,0,0,0,1,1,0],[0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,1,0,1,0,0,0,1,1,1,0,1,0,1,0,1,0,0,0,1,1,1,1,0,1,1,0,1,0,1,0,1,1],[0,0,0,1,1,1,0,1,1,0,1,0,1,1,1,1,0,1,0,0,1,0,1,1,0,0,1,0,0,0,1,1,1,1,1,0,0,1,1,0,0,0,0,1,1,0,0,1,1],[0,0,0,0,0,1,0,0,0,0,1,1,0,0,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,1,0,1,0,1,0,1,0,0,0,1],[1,0,1,1,0,0,1,1,0,0,0,1,1,1,1,0,0,1,0,1,0,0,1,0,0,1,0,1,1,1,1,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1],[1,1,1,0,0,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,1,1,1,0,1,0,0,1,0,0,0,1,1,1],[1,0,1,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,0,1,0,0,1,1,0,1,0,1,0,1,0,1,0,0,1,1,1,0,1],[1,1,1,0,1,1,1,1,0,0,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,1,0,0,1,1,1,1,1,0,0,0,1,1,0,0,1,1,0,1],[0,1,0,0,1,1,1,1,1,1,0,1,0,0,1,0,1,1,0,0,1,1,1,1,0,1,1,0,0,1,1,1,1,1,1,0,0,1,0,1,1,0,0,0,0,1,1,0,0],[0,1,1,0,0,1,0,1,0,1,1,1,0,1,0,0,0,0,1,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,1,1,0,1,1,0,1,0,1,1,1,0,0],[0,0,0,0,1,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,0,0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,1,0],[0,1,1,0,0,1,1,0,1,0,0,0,0,0,0,0,1,1,0,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,1,0,1,0,0,1,0,0,0,0],[1,0,1,1,0,0,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,0,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,1,1],[0,0,1,0,0,1,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,1,0,1,1,1,1,0,0,0,1,1,0,1,0,1,1,1,0,1,1,0],[0,1,1,0,0,0,0,0,0,1,1,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,0,1,1,1,1,1,1,0,0,1,1,1,0,1,1,1,0,0,0,1,1],[0,0,1,1,1,1,0,1,1,0,0,0,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,0,1,0,0,1,1,1,0,0,0,0,1],[1,0,1,0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,1,0],[0,1,0,1,1,1,0,1,1,0,0,0,1,1,1,0,1,1,1,1,1,1,1,0,0,1,0,1,1,0,0,1,1,0,0,0,1,0,1,0,0,0,1,1,0,1,1,0,1],[1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,0,1,1,1,1,0,1,0,0,0,1,1,1,0,1,0,0,0,1,0,0,1,1,0,0,0,0,1],[0,1,1,0,1,1,1,1,0,0,1,0,0,1,1,0,1,1,0,0,1,0,1,1,1,0,0,1,0,1,1,1,1,1,0,1,1,0,0,1,0,0,1,1,0,0,1,0,1],[0,0,0,0,0,1,1,1,0,1,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,1,1,1],[1,0,0,0,1,1,0,1,1,0,0,1,1,1,0,1,1,0,1,1,0,1,1,0,0,1,0,0,0,1,1,1,1,0,1,0,1,0,1,1,1,0,0,1,0,1,0,0,1],[1,0,1,0,1,0,0,1,1,1,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,1,0,0,1,0,1,0,1,0,0,1,1,0,0,0],[0,1,0,0,1,0,1,1,1,0,0,1,1,0,1,1,0,1,0,0,1,1,1,1,1,0,0,0,0,1,1,1,0,0,1,0,1,1,1,0,0,0,0,1,0,0,1,0,0],[0,1,0,0,1,1,0,0,1,0,0,0,0,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,1,0,1,1,0,1,1,0,1,1,1,1,0,0,1,0,1,1,1],[0,1,0,0,1,0,1,0,1,1,0,0,0,0,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,1,1,1,0,0,1,0,0,0,1,1,0,1,0,1,0],[1,0,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1],[0,1,1,0,0,1,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,1,1,1,0,1,0,0,0,1,0,0,0,1,1,1,1,0,1,1],[0,1,1,0,0,1,0,1,1,1,0,0,1,1,0,0,0,1,1,0,1,0,0,0,0,0,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0],[0,0,1,1,1,0,1,0,1,1,1,0,0,1,0,0,1,1,1,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,0,1],[1,1,1,1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1,1,0,1,0,0,1,0,0,1,1,1,1,1],[1,1,1,0,1,1,0,0,1,1,0,1,1,1,0,0,1,1,1,1,0,1,0,1,1,0,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,1,1,1,0,0],[1,1,1,1,0,1,0,0,1,0,1,1,1,1,0,1,0,0,0,0,0,0,1,0,1,1,0,0,0,0,1,1,0,0,1,0,0,1,1,1,1,1,0,1,0,0,0,1,1],[0,0,1,1,0,1,1,0,1,1,0,0,0,1,0,0,0,1,1,0,1,0,1,1,0,1,0,0,1,1,1,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,1,0,1],[1,1,1,0,1,0,0,1,0,1,0,1,1,1,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,1,1,0,1,0,0,1,1,1],[0,1,0,0,1,0,0,1,0,0,0,1,1,0,0,0,1,0,1,0,1,1,0,0,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1],[0,1,0,0,0,0,1,1,0,0,1,0,1,0,1,1,1,0,1,0,0,1,1,1,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,1,1,0,0,0,1,0],[0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,1,1,1,0,1,0,1,1,1,0,1,0,0,0,1,1,1,0,1,1,1,0,0,0,0,1,1,0,1,1],[0,0,1,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,0,1,1,0,1,0,0,1,1,1,1,0,1,1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,1,0,1,0],[1,1,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1,0,0,1,1,1,0,0,1,0,1,0,1,1,1,0,0,0,0,1,0,0,0,1,0,0,1,1,1,0,0,0],[1,1,0,1,1,1,1,0,0,1,0,1,1,1,1,0,1,0,0,0,0,0,1,1,1,1,0,0,0,1,0,1,1,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1],[0,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,1,1,1,1,0,0,0],[1,0,0,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,0,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,0,0,0,1,0,1,1,1,1,1,0,0,0,1,1],[1,0,0,1,0,0,1,0,0,0,1,0,0,0,1,1,1,0,1,1,1,0,1,0,0,1,0,0,0,1,0,1,1,0,1,0,0,0,1,1,0,0,0,0,1,0,1,0,1]];
const bigInput = makeGrid(200); 
// const smallInput = [[1,0],[0,1]];
const smallInput = [[1,1],[0,1]];

// console.log(largestIsland(smallInput));
console.log(largestIsland(bigInput));
