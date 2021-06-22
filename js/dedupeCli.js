const { Transform } = require('stream');
const map = {};
let timeout;

/**
 * This is a script I created to dedupe notes from Evernote
 * Run the script to start listening for content from the CLI...
 * then paste the whole contents of the note into the CLI
 * paste the contents of the duplicate note and this should
 * tell you the delta!
 */
const transformStream = new Transform({
    transform: function(chunk, encoding, callback) {
        // chunk is a buffer, use .toString()
        const chunks = chunk.toString().split('\n');
        for (ch of chunks) {
            // discard empty spaces
            const str = ch.trim();
            if (str) {
                map[str] = ++map[str] || 1;
            }
        };
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            const delta = Object.keys(map).filter(key => {
                return map[key] === 1;
            });
            const combined = Object.keys(map);
            console.log('Delta :\n', delta);
            console.log('Combined :\n', combined);
        }, 500);
        callback();
    }
});

process.stdin.pipe(transformStream);
