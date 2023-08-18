import path from 'path';
import fs from 'fs';
import yargs from 'yargs';
import express from 'express';
import getIndex from './getIndex.js';


const args = yargs(process.argv.slice(2))
    .command({
        command: '<path>',
        alias: 'f',
        desc: 'the path or directory to serve'
    })
    .demandCommand(1, 'You must specify the path to serve')
    .option('p', {
        alias: 'port',
        describe: 'port to use',
        default: 5555,
        type: 'number'
    })
    .option('d', {
        alias: 'delay',
        describe: 'request timeout in milliseconds',
        default: 0,
        type: 'number'
    })
    .help()
.argv

const { port, delay, _ } = args;
let _path = _[0];
_path = path.resolve(process.cwd(), _path)
console.log('Starting static server for : ', _path);

const isDir = fs.lstatSync(_path).isDirectory();

function delayer(req, res, next) {
    setTimeout(next, delay);
}

export default function serve() {
    const app = express();
    if (isDir) {
        app.get('/', delayer, function(req, res) {
            res.send(getIndex(_path));
        });
        app.use(delayer, express.static(_path, { maxAge: 5000 }));
    } else {
        app.use(delayer, (req, res) => {
            res.sendFile(_path, { maxAge: 5000 });
        });
    }
    app.listen(port, () => console.log(`Server listening on : http://localhost:${port}/ with a delay of ${delay}`));
}

