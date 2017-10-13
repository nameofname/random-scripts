/**
 * Reverse a string - the efficient way
 */
module.exports = str => {
    const arr = str.split('');
    for (var i = 0; i < Math.floor(arr.length / 2); i++) {
        const tmp = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = tmp;
    }
    return arr.join('')
}

