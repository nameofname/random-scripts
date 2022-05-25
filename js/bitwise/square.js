// This function will square a number without using multiplacation, Math.pow, etc
// It uses bitwise operations instead : 
function square(x) {
    const negative = x < 0;
    x = Math.abs(x);
    const places = x.toString(2).length - 1;
    let s = 0;

    for (let i = places; i >= 0; i--) {
        const mask = 1 << i;
        if (x & mask) {
            s += x << i;
        }
    }

    if (negative) return ~s + 1;
    return s;
}

console.log(square(5));
console.log(square(-5));
