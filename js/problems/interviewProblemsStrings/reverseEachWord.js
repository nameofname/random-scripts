"use strict";

// 2.1 Given a string, reverse each word in the sentence "Welcome to this Javascript Guide!" should be become
// "emocleW ot siht tpircsavaJ !ediuG"


const reverseWords = str => {
    const arr = str.split('').reverse();
    const out = [];
    let currWord = [];
    arr.forEach((letter, idx) => {
        // for each letter, push to the current word, if we hit a break, join the word and push to out :
        if (letter === ' ') {
            out.push(currWord.join(''));
            currWord = [];
        } else {
            currWord.push(letter);
        }
    });
    out.push(currWord.join(''));
    return out.join(' ');
};


const str1 = "Welcome to this Javascript Guide!";

console.log(reverseWords(str1));