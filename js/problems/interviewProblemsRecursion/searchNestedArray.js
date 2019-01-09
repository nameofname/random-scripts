const nestedArray = [[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]];

// search for a primitive type
function searchNestedArray(array, type) {
    const out = [];
    function _seek(arr) {
        arr.forEach(entry => {
            if (Array.isArray(entry)) {
                _seek(entry);
            } else if (typeof entry === type) {
                out.push(entry);
            }
        });
    }

    _seek(array);
    return out;
}

console.log('all of the numbers in the nested array are :', searchNestedArray(nestedArray, 'number'));