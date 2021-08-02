/**
 * https://docs.google.com/document/d/1ONP-SfNQF537-97Z1Ev2ubaP0Jwt4INoon4-7Zvqe20/edit#
 * Imagine two arrays, [1, 2, 3] and [4, 5, 6] and they represent the integers 123 and 456. The exercise has three phases:
Phase 1: I have them define a function that returns an array with the sum ([5, 7, 9]) but they cannot join the values, they have to work column by column (loop through the arrays backwards and add 6 + 3, then 2 + 5, then 1 + 4) to get the result.
Phase 2: I change [4, 5, 6] to [4, 5, 9]. They need to now update their code to handle carrying over the remainder from summing the columns.
Phase 3: I change the arrays to be different lengths, for instance [1, 1, 2, 3] and [4, 5, 6]. They now need to prepend one of the arrays with 0s and account for the case when they might have to add an extra column at the beginning for a final carry over.
 */

// 12:05
function summer(a1, a2) {
    const a = [];
    let remainder = 0;
    const longerArr = a1.length > a2.length ? a1 : a2;
    const shorterArr = longerArr === a1 ? a2 : a1;

    for (let i = longerArr.length - 1; i >=0; i--) {
        const n1 = longerArr[i];
        const n2 = shorterArr[i - (longerArr.length - shorterArr.length)] || 0;
        let num = n1 + n2 + remainder;
        if (num > 10) {
            remainder = num % 10;
            num = 0;
        } else {
            remainder = 0;
        }
        a[i] = num;
    }
    return a;
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 9, 3];
console.log(summer(arr1, arr2));