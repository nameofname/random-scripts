"use strict";

const { spawn, fork } = require('child_process');

/**
 * to test : 
 * 1. when you have a child process, what is stdin and stdout ? 
 * 2. if you use 'inherit' how does it change? 
 * 3. what about pipe? 
 * 
 */

const logLocation = '/Users/ronald/projects/random-scripts/js/child_process/fakeLog.txt';
// pipe is the default
// exposes the subprocesses' stdio via child.stdio[0 | 1 | 2] or child.stdin, etc. 
const child = spawn('tail', ['-f', logLocation], { stdio: 'pipe' });

// console.log(child);