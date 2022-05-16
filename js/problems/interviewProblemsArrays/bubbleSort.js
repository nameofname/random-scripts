// just run it with the logger uncommented and see why bubble sort sucks.
function bubbleSort(arr) {
    let outOfOrder = true;
    while (outOfOrder) {
        outOfOrder = false;
        for (let idx = 0; idx < arr.length; idx++) {
            // console.log('checking', idx, arr[idx], idx + 1, arr[idx + 1]);
            if (arr[idx] > arr[idx + 1]) {
                // console.log('swapping');
                outOfOrder = true;
                const tmp = arr[idx];
                arr[idx] = arr[idx + 1];
                arr[idx + 1] = tmp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([4,5,8,9,6,4,2,34,5,6,1,4,2]));