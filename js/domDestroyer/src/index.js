const { listenKeypress } = require('char-code-sequence');
const { enable, disable } = require('./domDestroyer');
const muscleAscii = require('./muscle-ascii');


const startArr = "destroy".split('').map(letter => letter.charCodeAt());
const stopArr = "stop".split('').map(letter => letter.charCodeAt());
listenKeypress(startArr, () => {
    enable();
    console.log(muscleAscii);
});
listenKeypress(stopArr, stop);
