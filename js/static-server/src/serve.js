import path, { dirname } from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import yargs from 'yargs';
import express from 'express';
import getIndex from './getIndex.js';
import bodyParser from 'body-parser';
import serverFavicon from 'serve-favicon';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

function logger(req, res, next) {
    console.log(req.method, req.url, req.body);
    next();
}

function getDirectoryListing(req, res, next) {
    const reqPath = '.' + req.path;

    const newPath = path.resolve(_path, reqPath);
    const isDir = fs.lstatSync(newPath).isDirectory();
    console.log('getting request ', isDir, newPath)
    if (isDir) {
        return res.send(getIndex(newPath, reqPath));
    }
    return next();
}

// Respond to POST requests, for testing POST requests.
function postResponder(req, res, next) {
    if (Object.keys(req.body).length) {
        req.body.staticServer = true;
        return res.json(req.body);
    }
    return next();
}

let timeToDie = true;
/**
 * This function will fail once for the specified file name, then succeed on subsequent requests.
 * The fail function is reset every 30 seconds...
 * This is meant to simulate real life situations where requetsts sometimes fail
 */
function testFailOnce(fileName) {
    return function __testInterceptor(req, res, next) {
        // put test code here...
        const fullUrl = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        if (new URL(fullUrl).pathname.split('/').pop() === fileName) {
            if (timeToDie) {
                timeToDie = false;
                setTimeout(() => {
                    timeToDie = true
                    console.log('ready for another test.');
                }, 1000);
                res.header('Content-Type', 'application/xml');
                console.log('ronaldy breaking intentionally');
                return res.status(404).send('<Error><Code>NoSuchKey</Code><Message>Blerp.</Message><Key>123-123-123-123-123/beep/bop/boop.js</Key><RequestId>ABC123</RequestId><HostId>heyyyy</HostId></Error>');
            } else {
                return next();
            }
        }
        return next();
    }
}

let timeToSwitch = 0;
function testSwitchNextBuilds(req, res, next) {
    if (!fs.existsSync('./_next_bak')) {
        console.log('There is no BAK dir, do nothing.');
        return next();
    }
    if (req.originalUrl.includes('remoteEntry.js') && req.originalUrl.includes('ssr')) {
        if (timeToSwitch === 2) {
            console.log('replacing your directory.');
            execSync('mv _next_bak tmp && mv _next _next_bak && mv tmp _next');
            timeToSwitch = false;
            setTimeout(() => {
                timeToSwitch = 0
                console.log('ready for another test.');
            }, 1000);
        } else {
            console.log('NOT replacing your directory.');
            ++timeToSwitch;
        }
    }
    return next();
}

export default function serve() {
    const app = express();
    if (isDir) {
        console.log('ronaldy serving!');
        app.use(
            serverFavicon(path.join(__dirname, 'favicon/favicon.ico')),
            delayer,
            bodyParser.json(),
            logger,
            postResponder,
            getDirectoryListing,
            // testFailOnce('476.4d78d4bfc8dd4d3c.js'),
            testSwitchNextBuilds,
            express.static(_path)
        );

    } else {
        app.use(delayer, logger, (req, res) => {
            res.sendFile(_path, { maxAge: 5000 });
        });
    }
    app.listen(port, () => console.log(`Server listening on : http://localhost:${port}/ with a delay of ${delay}`));
}

