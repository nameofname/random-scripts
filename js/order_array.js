var array = [1,1,4,3,2,3,6,6,3,4,99,0,8,7,2,2,1];

/*
 * This is a super effecient function for sorting arrays of intergers. BUT! This method of sorting only works for arrays of positive intergers. 
 * It relies on the fact that arrays in JS are indexed by positive intergers. 
 * Honestly it's not a very useful tool for sorting, however you could see how this method might be applied to an efficient solution for sorting 
 * arrays of other data types by first mapping each member in the set to a positive interger. 
 */
function sort(arr) {
    const out = [];

    // create the library, adding all numbers to each. This is to accumulate all numbers, even duplicates.
    const lib = arr.reduce((arr, int) => {
        if (arr[int] === undefined) {
            arr[int] = 1;
        } else {
            ++arr[int];
        }
        return arr;
    }, []);

    lib.forEach((entry, idx) => {
        if (entry !== undefined) {
            for (let i = 0; i < entry; i++) {
                out.push(idx);
            }
        }
    });

    return out;
}


console.log(sort(array));
const bigTestArr = new Array(100000)
    .fill(() => 1)
    .map(() => Math.floor(Math.random() * 1000));


console.log(bigTestArr)
console.log(sort(bigTestArr));
