#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const express = require('express');


const args = yargs(process.argv.slice(2))
    .command({
        command: '<file>',
        alias: 'f',
        desc: 'the file to serve'
    })
    .demandCommand(1, 'You must specify the file to serve')
    .option('p', {
        alias: 'port',
        describe: 'port to use',
        default: 5555,
        type: 'number'
    })
    .option('t', {
        alias: 'throttle',
        describe: 'request timeout in milliseconds',
        default: 0,
        type: 'number'
    })
    .help()
.argv

const { port, throttle, _ } = args;
let file = _[0];
file = path.resolve(process.cwd(), file)
console.log('Starting static server for : ', file);

const app = express();
const isDir = fs.lstatSync(file).isDirectory();

function throttler(req, res, next) {
    setTimeout(next, throttle);
}

if (isDir) {
    app.use(throttler, express.static(file));
} else {
    app.use(throttler, (req, res) => {
        res.sendFile(file);
    });
}

app.listen(port, () => console.log(`Server listening on : http://localhost:${port}/ with throttle ${throttle}`));
