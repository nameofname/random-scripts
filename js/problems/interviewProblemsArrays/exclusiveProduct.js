// 1.5 Given an array of integers, return an output array such that output[i] is equal to the product of all
// the elements in the array other than itself. (Solve this in O(n) without division)


// Fun!... for me... ugh, who am I ?

const exclusiveProduct = arr => {

    // We can do this in 2n - count up then backwards, for each number before arr[i] - get the product and put it in
    // the current spot, then we go backwards doing the same with all the numbers to the right of arr[i]

    let totalProduct = 1;
    const out = arr.map((int) => {
        const tmpProduct = totalProduct;
        totalProduct = totalProduct * int;
        return tmpProduct;
    });

    let topProduct = 1;
    for (let i = arr.length - 1; i >=0; i--) {
        const int1 = arr[i];
        out[i] = out[i] * topProduct;
        topProduct = topProduct * int1;
    }

    return out;
};


const arr1 = [2, 2, 4, 1]; // [8, 8, 4, 16]
const arr2 = [0, 0, 0, 2]; // [0, 0, 0, 0]
const arr3 = [-2, -2, -3, 2]; // [12, 12, 8, -12]

console.log(exclusiveProduct(arr1));
console.log(exclusiveProduct(arr2));
console.log(exclusiveProduct(arr3));