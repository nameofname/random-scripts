/*
 * A number is considered to be 'lucky' if the sum of it's squared digigs is equal to 1
 *      - or if any number in a sequence from applying such a tranformation results in the number 1
 * For example, the number 7
 *      step 1: transform(7) = 49
 *      step 2: transform(49) = 16 + 81 = 97
 *      step 3: transform(97) = 81 + 49 = 130
 *      step 4: transform(130) = 1 + 9 + 0 = 10
 *      step 5: 10 ... hit! because 1 + 0 = 1 !
 */

// 4 => 16 => 1 + 36 => 37 => 9 + 49 => 58 => 25 + 64 => 89 => 64 + 81 => 145 => 1 + 16 + 25 => 42 => 16 + 4 => 20 => 4 + 0 => 4
// 7 => 49 => 16 + 81 => 130 => 1 + 9 = 10 => 1
// 7 => 49 => 97 => 130 => 1 + 9 = 10 => 1

const hits = new Map();

function step (int) {
    let  arr = `${int}`.split('');
    arr = arr.map(n => parseInt(n, 10));
    arr = arr.map(num => num * num);
    const curr = arr.reduce((prev, int) => prev + int, 0);
    return curr;
}

function luckyNumber (int) {

    if (hits.get(int) === true) {
        return true;
    } else if (hits.get(int) === false) {
        return false;
    }

    const map = new Map();
    console.log('working out code');
    let curr = step(int);
    const used = []; // TODO.
    
    map.set(int, true);
    map.set(curr, true);

    while (curr !== 1) {
        curr = step(curr);

        if (map.get(curr) === true) {
            hits.set(int, false);
            return false;
        }

        map.set(curr, true);
    }

    hits.set(int, true);    
    return true;
}


console.log(luckyNumber(7));
console.log(luckyNumber(7));
