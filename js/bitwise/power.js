// This function is like my function to square an number usinmg bitwise operations
// But instead it raises X to the power N
function power(x, p) {
    const negative = x < 0;
    x = Math.abs(x);
    const places = x.toString(2).length - 1;
    let s, currPower = x;

    // we do the same thing we do when we square
    // but each time we reset s to 0 and use the currPower
    while (--p) {
        s = 0;
        for (let i = places; i >= 0; i--) {
            const mask = 1 << i;
            if (x & mask) {
                s += currPower << i;
            }
        }
        currPower = s;
    }

    if (negative) return ~s + 1;
    return s;
}

console.log(power(5, 2));
console.log(power(5, 3));
console.log(power(-5, 3));
console.log(power(2, 4));
