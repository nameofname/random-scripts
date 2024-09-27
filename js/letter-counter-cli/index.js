import readline from 'readline';

const stack = [];
const deduped = {};
const { stdin } = process;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function isLetter(str) {
    return str && str.length === 1 && str.match(/[a-z]/i);
}

function isSpace(str) {
    return str === ' '
}

const allLetters = new Array(26).fill(1).map((_, i) => String.fromCharCode(97 + i));

stdin.on('keypress', (s, key) => {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    // console.log('ronaldy 2', key)
    // TODO ! other special cases :
    const kkey = key.name === 'space' ? ' ' : key.name;
    if (key.name === 'backspace') {
        stack.pop();
    } else if (isLetter(kkey) || isSpace(kkey)) {
        stack.push(kkey.toLowerCase());
    }

    let deduped = stack.reduce((a, c) => {
        return isLetter(c) ? Object.assign(a, { [c]: true }) : a;
    }, {});
    const remaining = allLetters.reduce((a, c) => deduped.hasOwnProperty(c) ? a : [...a, c], []);
    deduped = Object.keys(deduped).sort();

    rl.write(`${stack.join('')}
        \n letters used (${deduped.length}): [ ${deduped.join(', ')} ]
        \n remaining letters (${remaining.length}): [ ${remaining.join(', ')} ]
        \n sentence length: ${stack.length}`);
});
