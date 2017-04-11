"use strict";

const glob = require('glob');
const files = glob.sync('*/**/*.js')
const exec = require('child_process').exec;
let i = 0;

/**
 * Super cool helper to move a lot of files with git. 
 * I used the interval because for some strange reason if 
 * you do this all at once some of the files are moved, but not added by git. 
 */
const int = setInterval(() => {
    const file = files[i];
    i++;
    if (!file) {
        clearInterval(int);
    } else {
        const command = `git mv ${file} ${file.replace('.js', '.es.js')}`;
        if (!file.includes('.es.js')) {
            console.log(command);
            exec(command);
        }
    }
}, 100);
