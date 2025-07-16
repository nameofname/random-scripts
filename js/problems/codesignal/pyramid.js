function pyramid(h) {
    let len = (h * 2)- 1;
    let filledIn = -1;
    let out = ``;

    for (let i = 0; i < h; i++) {
        filledIn += 2;
        let arr = [];
        const pad = (len - filledIn) / 2;
        // console.log(`row ${i} with filled in ${filledIn} pad of ${pad} and len ${len}`)
        arr = arr.concat(new Array(pad).fill(' '));
        arr = arr.concat(new Array(filledIn).fill('*'));
        arr = arr.concat(new Array(pad).fill(' '));
        out = `${out}${arr.join('')}\n`;
    }
    return out.slice(0, -1);
}
console.log(pyramid(10));