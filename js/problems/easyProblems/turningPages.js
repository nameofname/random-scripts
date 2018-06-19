function pageCount(n, p) {
    let left = 1;
    let right = n % 2 === 0 ? n : n - 1;
    let turns = 0;

    while (left < p && right > p) {
        left += 2;
        right -= 2;
        ++turns;
    }

    return turns;
}

console.log(pageCount(4, 2));
