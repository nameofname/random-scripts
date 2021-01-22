const { Readable, Transform } = require('stream');
const fs = require('fs');

// Note* I'm not implementing the read method in my Readable
// Because I close the stream out below
// Doesn't make sense, but that's how it works :
const readStream = new Readable();
const writeStream = fs.createWriteStream('example.txt');
const transformStream = new Transform({
    transform: function(chunk, encoding, callback) {
        // chunk is a buffer, use .toString()
        const chunks = chunk.toString().split('\n');
        for (ch of chunks) {
            // discard empty spaces
            if (ch.trim()) this.push(`I transformed this chunk: ${ch}\n`);
        };
        callback();
    }
});

readStream.pipe(transformStream).pipe(writeStream);

readStream.push('Mr. Owl, how many licks does it take to get to the tootsie roll center of a tootsie pop?\n');
readStream.push('one\n');
readStream.push('two\n');
readStream.push('three\n');
readStream.push('crunch\n');
// IMPORTANT! Your read stream blows up if you don't close it using one of the 2 following methods : 
// readStream.push(null);
readStream.destroy();
// If you use the fs version of the readstream, there's a .close() method
// And you don't actually need to call it in that case, fs should do it for you.
