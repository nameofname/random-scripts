function miniMaxSum(arr) {
    const total = arr.reduce((prev, curr) => prev + curr, 0);
    let lowest = total + 1;
    let highest = -1;

    arr.forEach(num => {
        const curr = total - num;
        lowest = lowest < curr ? lowest : curr;
        highest = highest > curr ? highest : curr;
    });

    console.log([lowest, highest].join(' '));
}


console.log(miniMaxSum([1, 2, 3, 4, 5]))
