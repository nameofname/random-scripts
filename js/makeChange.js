// Preface : this is the make change problem that the LT team uses for interviews
// I noticed that it's similar to the problem to make change they used to give at RTR
// In that problem, the programmer was asked to make change with the smallest number of coins that the system of units allowed
// In that case, the greedy algorithm does not always give the correct answer
// Here I provide both answers for comparison.

// Given some price and users input need to calculate how to give change in given coins set, for example in euro ones: 1, 2, 5, 10, 20, 50
// Example:
// var price = 57;
// var input = 100;
// // available coins:  1, 2, 5, 10, 20, 50
// ----------------------------------------
// in this case change is 43 so output should be [20, 20, 2, 1] or { 20: 2, 2: 1, 1:1 } or something else that's easy to read and understand

const euroUnits = [1, 2, 5, 10, 20, 50];
const usUnits = [1, 5, 10, 25];
const fakeSet = [1, 4, 5, 20];

function getChange(price, paid, units) {
    const change = paid - price;
    let shortestSolution;

    function doChangeRecursion(changeArr) {
        // console.log('do the recur', changeArr)
        const changeSum = changeArr.reduce((curr, unit) => (curr + unit), 0);
        const remainder = change - changeSum;
        const availableUnits = units.filter(int => int <= remainder);

        for (let i = availableUnits.length - 1; i >= 0; i--) {
            const unit = availableUnits[i];
            const newArr = [...changeArr, unit];
            const newSum = changeSum + unit;
            if (shortestSolution === undefined || newArr.length < shortestSolution.length) {
                if (newSum === change) {
                    shortestSolution = newArr;
                } else {
                    doChangeRecursion(newArr);
                }
            }
        }
    }

    doChangeRecursion([]);
    return shortestSolution;
}

function getChangeGreedy(price, paid, units) {
    units = [...units]; // copy so as not to mutate the original units arr
    const change = paid - price;
    const changeArr = [];
    let sum = 0;
    let nextUnit = units.pop();

    while (sum < change) {
        const remainder = change - sum;
        if (remainder < nextUnit) {
            nextUnit = units.pop();
        } else {
            sum += nextUnit;
            changeArr.push(nextUnit);
        }
    }

    return changeArr;
}


console.log('change with recursive algo', getChange(92, 100, fakeSet)); // should output 4, 4 - and not 5, 1, 1, 1
console.log('change with greedy algo', getChangeGreedy(92, 100, fakeSet)); // should output 5, 1, 1, 1

console.log('kicikkkk it');
for (let i = 1; i < 5; i++) {
    console.log(`change with greedy algo ${i}`, getChangeGreedy(i, 100, usUnits));
    console.log(`change with recursive algo ${i}`, getChange(i, 100, usUnits));
}

// to get 9, 5 and 4 1s or 3 3s .........
/*
so how to figure out the smallest number of coins i could use? 
well i could just try everything
or, i could use modulus to figure out which things evenly divide. 
use recursion to figure out the different paths to the correct solution! 

US units, make 44 : 
25, 10, 5, 1, 1, 1, 1
10, 10, 10, 
*/