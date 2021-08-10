/**
 * 3:30
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

function getAddMap() {
    const out = {};
    for (let i = 0; i <= 10; i++) {
        for (let j = 0; j <= 10; j++) {
            const sum = i + j;
            out[`${i}-${j}`] = {
                sum: sum,
                num: sum % 10,
                carry: sum >= 10 ? 1 : 0
            }
        }
    }
    return out;
}

function getNextMap() {
    return Array(11).fill(1).map((x, idx) => String(++idx));
}


var addStrings = function(num1, num2) {
    const ret = [];
    const addMap = getAddMap();
    const nextMap = getNextMap();
    const a1 = (num1.length > num2.length ? num1 : num2).split('');
    const a2 = (num1.length > num2.length ? num2 : num1).split('');

    let currCarry = 0;
    for (let i = a1.length - 1; i >= 0; i--) {
        let currA1 = a1[i];
        const currA2 = a2[i - (a1.length - a2.length)];
        if (currCarry === 1) {
            currA1 = nextMap[currA1];
        }
        const mapKey = (currA2 === undefined) ? `${currA1}-0` : `${currA1}-${currA2}`;
        const {num, carry} = addMap[mapKey];
        currCarry = carry;
        ret.unshift(num);
    }

    if (currCarry) {
        ret.unshift('1')
    }

    return ret.join('');
};

console.log(addStrings('11', '123'));
