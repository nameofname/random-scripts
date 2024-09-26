import readline from 'readline';

const stack = [];
const deduped = {};
const { stdin } = process;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function isSpace(str) {
     return str === ' '
}

stdin.on('keypress', (s, key) => {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    // console.log('ronaldy 2', key)
    // TODO ! other special cases :
    const kkey = key.name === 'space' ? ' ' : key.name;
    if (key.name === 'backspace') {
        stack.pop();
        delete deduped[kkey];
    } else {
        if (isLetter(kkey)) {
            Object.assign(deduped, { [kkey.toLowerCase()]: true });
        }
        if (isLetter(kkey) || isSpace(kkey)) {
            stack.push(kkey);
        }
    }

    const keyArr = Object.keys(deduped);
    rl.write(`${stack.join('')} \n letters used (${keyArr.length}): [ ${keyArr.join(', ')} ]}`);
});
