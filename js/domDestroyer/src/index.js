const { listenKeypress } = require('char-code-sequence');
const { enable, disable } = require('./domDestroyer');
const muscleAscii = require('./muscle-ascii');


const startArr = "destroy".split('').map(letter => letter.charCodeAt());
const stopArr = "stop".split('').map(letter => letter.charCodeAt());
let isOn = false;
function turnOn() {
    enable();
    removeScrollClasses();
    console.log(muscleAscii);
    isOn = true;
}
function turnOff () {
    disable();
    console.log('stop DOM Destroyer');
    isOn = false;
}
function removeScrollClasses() {
    // remove all classes from the DOM that contain the word 'Scroll'
    // this is specifically so I can read recipes on my favorite site
    var items = document.getElementsByTagName("*");
    Array.from(items).forEach(ele => {
        ele.classList.forEach(klass => {
            if (klass.toLowerCase().includes('scroll')) {
                ele.classList.remove(klass);
            }
        });
    });
}
// enable / disable when user types key phrases
listenKeypress(startArr, turnOn);
listenKeypress(stopArr, turnOff);
// enable / disable when the dom destroyer icon is clicked
chrome.runtime.onMessage.addListener(msg => {
    if(msg.txtt==="domDestroyer") {
        isOn ? turnOff() : turnOn();
    }
});
