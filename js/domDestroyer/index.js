const { listenKeypress } = require('char-code-sequence');

function destroy(e) {
    e.target.parentNode.removeChild(e.target);
}
function enableDestroyer() {
    document.addEventListener('click', destroy);
}

function disableDestroyer() {
    document.removeEventListener('click', destroy);
}

const stringArr = "destroy!".split('').map(letter => letter.charCodeAt()); // [ 100, 101, 115, 116, 114, 111, 121, 33 ]
listenKeypress(stringArr, () => console.log('destroy everything!'));
