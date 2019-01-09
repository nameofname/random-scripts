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

function flattenTernary(array) {
    return !Array.isArray(array)
        ? array
        : array.reduce((concatted, curr) => concatted.concat(flatten(curr)), []);
}

function flatten(array) {
    if (!Array.isArray(array)) return array;
    return array.reduce((concatted, curr) => concatted.concat(flatten(curr)), []);
}

function searchWithFlatten(array, type) {
    return flatten(array).filter(curr => typeof curr === type);
}

console.log('all of the numbers in the nested array are :', searchNestedArray(nestedArray, 'number'));
console.log('flatten :', flatten(nestedArray));
console.log('searchWithFlatten :', searchWithFlatten(nestedArray, 'number'));