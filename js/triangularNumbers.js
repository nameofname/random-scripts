function triangularNumbers(n) {
    let t = 0;
    for (let i = 1; i <= n; i++) {
        t = i * (i +1 ) / 2;
        console.log(i, t)
    }
    return t;
}

// console.log(triangularNumbers(6));
