// https://github.com/kennymkchan/interview-questions-in-javascript#array
// 1.1 Given an array of integers, find the largest product yielded from three of the integers


const addToTop = (arr, int) => {
    let found;

    if (!arr.length) {
        arr.push(int);
        return arr;
    }

    loop:
    for (let i = arr.length; i > 0; i--) {
        const curr = arr[i - 1];
        if (curr === undefined || curr < int) {
            found = i;
            break loop;
        }
    }
    if (found !== undefined) {
        if (arr.length === 3) {
            arr.splice(found, 0, int);
            arr.shift();
        } else {
            arr.push(int)
        }
    }
    return arr;
};

const lergestProductOfThree = arr => {
    const largestThree = arr.reduce((a, curr) => {
        return addToTop(a, curr);
    }, []);
    return largestThree;
    // return largestThree[0] * largestThree[1] * largestThree[2];
};


console.log(lergestProductOfThree([1, 4, 5, 7, 3, 13, 10, 5, 11, 6, 9, 60, 2]));