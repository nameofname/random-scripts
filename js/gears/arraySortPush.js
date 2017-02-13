"use strict";


module.exports = (obj, comparisonField, arr) => {
    const value = obj[comparisonField];

    // if 1st entry, simply push to the array and return
    if (arr.length === 0) {
        arr.push(obj);
        return arr;
    }

    // if 2nd entry, figure out if it's greater or less than and either push or shift
    if (arr.length === 1) {
        return value >= arr[0][comparisonField] ? arr.push(obj) : arr.unshift(obj);
        return arr;
    }

    setLoop :
        for (let i = 0; i <= arr.length; i++) {

            if (i === arr.length) {
                // found that the new value is the highest, push it to the end of the list
                arr.push(obj);
                break setLoop;
            }

            const curr = arr[i][comparisonField];
            const prev = arr[i - 1] ? arr[i - 1][comparisonField] : 0;

            // found the position at which the new value is between other values in the list.
            if ((prev <= value) && (value <= curr)) {
                // OPTIMIZATION : Only splice it into it's position if it is a new unique value.
                if ((value !== curr) && (value !== prev)) {
                    arr.splice(i, 0, obj);
                }
                break setLoop;
            }
        }

    return arr;
};
