"use strict";

const { Readable, Transform } = require('stream');
const colorLog = require('./colorLog');

/**
 * Here we must distinguish between readable and writable object mode:
 *      - Readable object mode enables your stream to accept an object rather than just a string.
 *      - Writable object mode allows your stream to push out aj object in the same manner.
 */
const stringToObject = new Transform({

    readableObjectMode: true, // enable readable object mode so we can push an object, not a string

    transform(chunk, encoding, callback) {
        const arr = chunk.toString().trim().split(',');
        const object = {};
        for (let i of arr) {
            this.push({[i]: 'flerp'});
        }
        callback();
    }

});


// As of now this is just a simple pass through,
// however you could see how this could easily become a throttling transformer that only invokes the next
// stream if a certain time threshold elapses.
const accumulator = new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
        Object.assign(this.accumulatedResult, chunk);
        callback(null, chunk);
    }
});
accumulator.accumulatedResult = {};


const objectToString = new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
        this.push(JSON.stringify(chunk));
        colorLog.green('x happened:', JSON.stringify(chunk));
        callback();
    }
});

process.stdin
    .pipe(stringToObject)
    // .on('data', () => process.stdout.write('.')) // create a little progress bar.
    .pipe(accumulator)
    .pipe(objectToString)
    .pipe(process.stdout);
