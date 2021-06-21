/*
 * A number is considered to be 'lucky' if the sum of it's squared digits is equal to 1
 *      - or if any number in a sequence from applying such a tranformation results in the number 1
 * For example, the number 7
 *      step 1: transform(7) = 49
 *      step 2: transform(49) = 16 + 81 = 97
 *      step 3: transform(97) = 81 + 49 = 130
 *      step 4: transform(130) = 1 + 9 + 0 = 10
 *      step 5: 10 ... hit! because 1 + 0 = 1 !
 */

const map = {};

function transform(num) {
    const numArr = num.toString().split('').map(s => Number(s));
    const sum = numArr
        .map(int => {
            return int * int
        })
        .reduce((acc, n) => acc + n);
    return sum;
}

function luckyNumber(num) {
    let curr = num;
    let itar = 0;
    while (curr !== 1) {
        map[curr] = true;
        curr = transform(curr);
        itar++;
        console.log(curr)
        if (map[curr]) {
            return false;
        }
    }
    return true;
}


console.log(luckyNumber(8));
