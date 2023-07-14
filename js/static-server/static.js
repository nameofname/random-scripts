#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');
const express = require('express');


const args = yargs(process.argv.slice(2))
    .option('p', {
        alias: 'port',
        describe: 'port to use',
        default: 4321,
        type: 'number'
    })
    .option('f', {
        alias: 'file',
        describe: 'path to the file',
        type: 'string'
    })
    .demandOption(['file'])
.argv

let { file, port } = args;

file = path.resolve(process.cwd(), file)
console.log('Starting static server for : ', file);

const app = express();
// app.use(express.static)

app.get('/', (req, res) => {
    res.sendFile(file);
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));
