#!/usr/bin/env node

const { parse } = require('url');
const { spawnSync } = require('child_process');
const cheerio = require('cheerio');
const puppeteer = require("puppeteer");

const URL = process.argv[2] || '';
const url = parse(URL);

if (!URL || !url.protocol) {
    console.log(`Please include a valid URL, got this: ${URL}`);
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

function suffixImgs(imgArr) {
    return imgArr.reduce((map, filePath) => {
        let fileName = filePath.split('/').slice(-1)[0];
        while (map[fileName]) {
            fileName = enumerateFilename(fileName);
        }
        return Object.assign(map, {[fileName]: filePath});
    }, {});
}

async function getData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.content();
    await browser.close();
    return data;
}

async function parseImgs(data) {
    const $ = cheerio.load(data);
    const imgs = [];
    $("img").each(function () {
        imgs.push(this.attribs.src);
    });
    return imgs;
}

function saveImgs(fileMap) {
    spawnSync('mkdir', ['-p', 'image-downloads']);
    process.chdir('./image-downloads');
    Object.keys(fileMap).forEach(fileName => {
        console.log(`fetching ${fileName} from ${fileMap[fileName]}`);
        // spawnSync('wget', ['-O', fileName, fileMap[fileName], '-P', './image-downloads']);
        spawnSync('wget', ['-O', fileName, fileMap[fileName]]);
    });
}

async function getImgs(url) {
    const data = await getData(url);
    const imgs = await parseImgs(data);
    const fileMap = suffixImgs(imgs);
    // console.log(fileMap)
    return saveImgs(fileMap);
}

getImgs(URL)
