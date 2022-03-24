const { spawnSync } = require('child_process');
const cheerio = require('cheerio');
const puppeteer = require("puppeteer");
const yargs = require('yargs/yargs');

const args = yargs(process.argv.slice(2))
    .option('n', {
        alias: 'numbered',
        describe: 'use numbered file names',
        type: 'boolean'
    })
    .argv
;
const u = new URL(args._ && args._[0], 'http://example.com');
const argUrl = u.href;

if (!argUrl) {
    console.log(`Please include a valid URL, got this: ${argUrl}`);
    process.exit(1);
}

// adds a numeric suffix to the file name, before the extension
function enumerateFilename(fileName) {
    const fileArr = fileName.split('.');
    const extension = fileArr.pop();
    let fileStem = fileArr.join('.');
    const suffix = fileStem.split('--').pop();
    
    if (isNaN(suffix)) {
        return [fileStem, '--', 1, '.', extension].join('');
    } else {
        fileStem = fileStem.split('--');
        fileStem.pop();
        fileStem = fileStem.join('--');
        return [fileStem, '--', parseInt(suffix) + 1, '.', extension].join('');
    }
}

// step 1
async function getData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'load'
    });
    const data = await page.content();
    await browser.close();
    return data;
}

// step 2
async function parseImgs(data) {
    const $ = cheerio.load(data);
    const imgs = [];
    $("img").each(function () {
        imgs.push(this.attribs.src);
    });
    return imgs;
}

// step 3
function suffixImgs(imgArr) {
    return imgArr.reduce((map, filePath) => {
        if (!filePath) {
            console.warn(`falsy filepath defined in ${imgArr}`);
            return map;
        }
        let fileName = new URL(filePath, 'http://example.com').pathname;
        fileName = fileName.split('/').slice(-1)[0];
        while (map[fileName]) {
            fileName = enumerateFilename(fileName);
        }
        return Object.assign(map, {[fileName]: filePath});
    }, {});
}

// step 4
function saveImgs(fileMap) {
    spawnSync('mkdir', ['-p', 'image-downloads']);
    process.chdir('./image-downloads');
    Object.keys(fileMap).forEach(fileName => {
        console.log(`fetching ${fileName} from ${fileMap[fileName]}`);
        // learnd the hard way that timeout option has to be in the front
        spawnSync('wget', ['-T', '3', '--tries', '1', '-O', fileName, fileMap[fileName]]);
    });
}

async function getImgs(url) {
    console.log(`fetching images for ${url}`);
    const data = await getData(url);
    const imgs = await parseImgs(data);
    const fileMap = suffixImgs(imgs);
    return saveImgs(fileMap);
}

module.exports = () => getImgs(argUrl);
