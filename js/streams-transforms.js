"use strict";


const { Readable, Transform } = require('stream');

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

const objectToString = new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
        this.push(JSON.stringify(chunk));
        callback();
    }
});

process.stdin
    .pipe(stringToObject)
    // .on('data', () => process.stdout.write('.')) // create a little progress bar.
    .pipe(objectToString)
    .pipe(process.stdout);
