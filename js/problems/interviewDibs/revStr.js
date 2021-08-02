// 12:23
function revStr(str) {
    const arr = str.split('');
    // this solution only loops to the middle of the string for efficiency
    for (let i = 0; i < Math.ceil(arr.length / 2); i++) {
        const curr = arr[i];
        const opposite = arr[arr.length - 1 - i];
        arr[i] = opposite;
        arr[arr.length - 1 - i] = curr;
    }
    return arr.join('');
}

console.log(revStr('ronald'));
