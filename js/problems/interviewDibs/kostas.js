// first up, reverse a string : 
// 12:25 - 12:35
function revString(s) {
    const arr = s.split('');
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        const tmp = s[i];
        console.log(tmp, arr[arr.length - 1 - i])
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = tmp;
    }
    return arr.join('');
}

// console.log(revString('ronald'));
// console.log(revString('ronalds'));
// console.log(revString('a man a plan panama'));

// the challenge is to fix this so that it logs the correct numbers and index
// 12:40 - 12:42 (then researched until 12:48)
// OK so I did this one really quick, but don't get cocky because I knew it was a gotcha, but I didn't recall exactly why...
// the variable i is declared outside of the scope of where the timeout function is created
// the SPECIFIC problem is that the coder uses the VAR keyword
// because var declarations are hoisted to the top of the function scope
// you can actually fix it just by using let or const 
// I actually solved it by declaring a new const inside of the for loop and thought that was the reason
// but turns out if you switch that to var it again breaks. 
// so the answer is hoisting in this contexst - this is the classic hoisting gotcha test. 
// Original code : 
/**
const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log("Index: " + i + ", element: " + arr[i]);
  }, 3000);
}
*/
function fixLoop() {
    const arr = [10, 12, 15, 21];
    let counter = 0;
    for (var i = 0; i < arr.length; i++) {
      const newS = `Index: ${i}, element: ${arr[i]}`;
      ++counter;
      let bla = 0 + counter;
      setTimeout(function () {
        console.log(i, bla, counter, newS);
      }, 10);
    }
}

// fixLoop();

// 12:49 - 1:04
// doing the EASY version of this problem... greedy solution
/**
const price = 83;
const input = 100;
const coins = [50, 20, 10, 5, 2, 1];
 */
const coins = [50, 20, 10, 5, 2, 1];
function countChange(price, tendered) {
    if (tendered < price) {
        throw new Error('you didnt pay enough');
    }
    let total = 0;
    const changeArr = [];
    while (total < (tendered - price)) {
        const needed = ((tendered - price) - total);
        let newI = 0;
        let coin = coins[newI];
        while (coin > needed) {
            ++newI;
            coin = coins[newI];
        }
        total += coin;
        changeArr.push(coin);
    }
    return changeArr;
}

console.log(countChange(58, 100));
console.log(countChange(83, 100));