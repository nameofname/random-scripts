// https://leetcode.com/problems/factorial-trailing-zeroes/
// the problem here is that the factorial number quickly exceeds the size limit for a number in JS 
// looks like factorial 5 is 120 - and after multiplying that produces more and more zeros
// i think because of the 20 - every 5 steps you get an extra zero
// because you've effectively... fuck idk done something 

function trailingZeroes(n) {
    let factorial = 1;
    for (let i = 1; i < n; i++) {
        factorial += factorial * i;
    }
    return factorial;
}

// console.log(trailingZeroes(3))
// console.log(trailingZeroes(5))
// console.log(trailingZeroes(Math.pow(10, 4)))

for (let i = 1; i < 100; i++) {
    console.log(trailingZeroes(i))
}