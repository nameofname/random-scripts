// reverse an array in place : 
// 12:35 - 12:38
function reverseArr(a) {
    for (let i = 0; i < Math.ceil(a.length / 2); i++ ) {
        const tmp = a[i];
        a[i] = a[a.length - 1 - i];
        a[a.length - 1 - i] = tmp;
    }
    return a;
}

console.log(reverseArr([1,2,3]));
console.log(reverseArr([1,2,3,4]));
console.log(reverseArr([1,2,3,4,5,6,7,8,9,0]));
