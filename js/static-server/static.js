#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');
const express = require('express');


// let file;
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
    // .check((argv) => {
    //     file = argv._[0]
    //     if (file) {
    //         return true // tell Yargs that the arguments passed the check
    //     }
    //     throw new Error("File name is required")
    // })
    .help()
.argv

const { port, _ } = args;
let file = _[0];

// console.log('ronaldy', args, file, port)

file = path.resolve(process.cwd(), file)
console.log('Starting static server for : ', file);

const app = express();
// app.use(express.static)

app.get('/', (req, res) => {
    res.sendFile(file);
});

app.listen(port, () => console.log(`Server listening on : http://localhost:${port}/`));
