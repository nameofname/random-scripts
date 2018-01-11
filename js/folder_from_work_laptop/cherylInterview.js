const arrSum = (a) => {
    a.reverse();
    let n = 0;
    while (a.length) {
        n += a.pop() * Math.pow(10, a.length);
    }
    return n;
};

const addArrs = function () {
    const arrays = Array.from(arguments);
    return arrays.reduce((prev, a) => prev + arrSum(a), 0)
}

console.log(addArrs([1,2,3], [4,5,9]))
