"use strict";

const { Readable, Writable, Duplex, Transform } = require('stream');

const arr = [1,2,3,4,5,6,7,8,9];


// The easiest stream :
// process.stdin.pipe(process.stdout);


// The following pipes your input from stdin and just logs the output, arbitrarily transformed with a message from me!
const startOutTest = () => {

    console.log('::: Starting Writable stream test');

    const outStream = new Writable({
        write(chunk, encoding, callback) {
            console.log(`Ronald was here ${chunk.toString()}`);
            callback();
        }
    });

    setTimeout(() => {
        outStream.end();
        startInTest();
    }, 2000); // terminate after 2 seconds

    // here we pipe stdin into our writing stream
    process.stdin.pipe(outStream);
};


// readable streams sound backwards, like they are reading from somewhere.
// however you have to just think of them as the opposite of writable streams, which you pipe a stream to it, it
// reads that data then somehow writes it.
// in contrast, readable streams don get data piped to them, they pipe data to another stream, usually writable.
const startInTest = () => {

    console.log('::: Starting Readable stream test');

    let counter = 0;

    const inStream = new Readable({
        read(size) {
            this.push(`whats the frequency ken? ${counter}\n`);
            ++counter;
            if (counter > 10) {
                this.push(null);
                startDuplexTest();
            }
        }
    });

    // here we pipe our reading stream out to the stdout stream
    inStream.pipe(process.stdout);
};


const startDuplexTest = () => {

    console.log('::: Starting Duplex stream test');

    let counter = 0;

    const inOutStream = new Duplex({
        read(size) {
            this.push(`whats the frequency ken? ${counter}\n`);
            ++counter;
            if (counter > 10) {
                this.push(null);
                startTransformTest();
            }
        },

        write(chunk, encoding, callback) {
            console.log(chunk.toString());
            callback();
        }
    });

    setTimeout(() => {
        inOutStream.end();
    }, 1000);

    // now you can pipe stdin to your stream, and the read function of your stream to stdout!
    // BUT! It's not exactly as you would think it is - the read and write are totally separate here.
    // What you most likely want to do is to have your input piped into your stream, transform it,
    // then pipe that transformed input to some other stream, or simply write it.
    process.stdin.pipe(inOutStream).pipe(process.stdout);
};


const startTransformTest = () => {

    console.log('::: Starting Transform stream test');

    const transform = new Transform({
        transform(chunk, encoding, callback) {
            this.push(`Transformed! ${chunk.toString()}`);
            callback();
        }
    });

    process.stdin.pipe(transform).pipe(process.stdout);

};

startOutTest();

