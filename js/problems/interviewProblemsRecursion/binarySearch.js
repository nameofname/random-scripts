const arr1 = [1,4,5,7,9,10,12,16,17,19,26,27,29,30,47,48,50,52,57];
const arr2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

function binarySearch(arr, searchValue) {
    function _binary(left, right) {
        console.log(left, right);
        if (left === right) {
            return arr[left] === searchValue ? left : undefined;
        }
        const half = left + Math.floor((right - left) / 2);

        if (arr[half] > searchValue) {
            return _binary(left, half);
        } else if (arr[half] < searchValue) {
            return _binary(half + 1, right);
        }
        return half;
    }
    return _binary(0, arr.length - 1);
}

console.log(binarySearch(arr1, 16));
console.log(binarySearch(arr2, 20));
console.log(binarySearch(arr1, 28));
console.log(binarySearch(arr2, 28));
arr2.forEach(int => console.log(binarySearch(arr2, int)));
