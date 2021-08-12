/**
 * @param {number[]} arr
 * @return {boolean}
 */
function canReorderDoubled(arr) {
    const map = new Map();
    arr.sort((a, b) => Math.abs(a) - Math.abs(b));
    // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        let count = map.get(arr[i]) || 0;
        map.set(arr[i], ++count);
    }

    for (let j = 0; j < arr.length -1; j++) {
        let currCount = map.get(arr[j]);
        let double = arr[j] * 2;
        let doubleCount = map.get(double);

        if (map.get(arr[j]) === 'used') {
            continue;
        } else if (doubleCount === undefined) {
            return false; 
        } else {
            --doubleCount;
            --currCount;
            // special case for 0 - gets decremented twice because 0 times 2 = iself 
            if (arr[j] === 0) {
                --doubleCount;
                --currCount;    
            }
            map.set(double, doubleCount === 0 ? 'used' : doubleCount);
            map.set(arr[j], currCount === 0 ? 'used' : currCount);
        }
    }

    // return map;
    for (val of map.values()) {
        if (val !== 'used') {
            return false;
        }
    }

    return true;
};

// console.log(canReorderDoubled([3,1,3,6])); // false
// console.log(canReorderDoubled([2,1,2,6])); // false
// console.log(canReorderDoubled([4,-2,2,-4])); // true
// console.log(canReorderDoubled([1,2,4,16,8,4])); // false
// console.log(canReorderDoubled([4,-2,2,-4])); // true
// console.log(canReorderDoubled([2,1,2,1,1,1,2,2])); // true
console.log(canReorderDoubled([0, 0])); // true
