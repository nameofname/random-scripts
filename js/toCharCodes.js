module.exports = charArr => charArr.reduce((arr, curr) => {
    if (typeof curr === 'number') {
        return arr.concat(curr);
    } else if (typeof curr === 'string') {
        if (curr.length !== 1) {
            throw new Error('you may only pass numbers or single characters strings to sequence utility');
        } else {
            return arr.concat(curr.charCodeAt(0));
        }
    }
}, []);

