#!/usr/bin/env node

require('isomorphic-fetch');
const { parse } = require('url');
const cheerio = require('cheerio');
const { spawnSync } = require('child_process');

const URL = process.argv[2] || '';
const url = parse(URL);

if (!URL || !url.protocol) {
    console.log(`Please include a valid URL, got this: ${URL}`);
    process.exit(1);
}

const extensions = ['jpg', 'jpeg', 'png'];

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

fetch(URL)
    .then(d => d.text())
    .then(data => {
        let matches = [];

        // get all of the images using using a Regex
        extensions.forEach(extension => {
            const re = RegExp(`(((https?)?:\/\/?)?[^\\s"']+.${extension})`, 'g');
            const innerMatches = data
                .match(re) || [];
                // dedupe based on host and path only
            const deduped = innerMatches.reduce((o, match) => {
                    const url1 = parse(match);
                    const useUrl = url1.host ? url1 : url;
                    const path = (url1.path || '').indexOf('/') === 0 ? url1.path : `/${url1.path}`;
                    const location = `${useUrl.protocol}//${useUrl.host}${path}`;
                    return Object.assign(o, { [location]: true })
                }, {})
            
            matches = matches.concat(Object.keys(deduped));
        });

        // TODO !!!!!!! 
        // There are 2 cases to solve for ... 
        // 1. sometimes images don't have extensions
        // 2. sometimes images are rendered very soon after load
        // The following page is an example of both : https://www.zipcomic.com/comedy-comics-1948-issue-1 
        // So I should check for images that don't match the regex by parsing image tags src attribute, AND 
        // find a way to get client rendered images
        const $ = cheerio.load(data);
        const imgs = $('img').attr('class');
        console.log('imgs', imgs)

        console.log('matches', matches)
        // if there are duplicate file names, number them to avoid conflict : 
        const fileMap = matches.reduce((map, filePath) => {
            let fileName = filePath.split('/').slice(-1)[0];
            while (map[fileName]) {
                fileName = enumerateFilename(fileName);
            }
            map[fileName] = filePath;
            return map;
        }, {});

        spawnSync('mkdir', ['-p', 'image-downloads']);
        // spawnSync('cd', ['image-downloads']);
        process.chdir('./image-downloads');
        Object.keys(fileMap).forEach(fileName => {
            console.log(`fetching ${fileName} from ${fileMap[fileName]}`);
            // spawnSync('wget', ['-O', fileName, fileMap[fileName], '-P', './image-downloads']);
            spawnSync('wget', ['-O', fileName, fileMap[fileName]]);
        });
    });

// console.log(enumerateFilename('bla--1.jpg'))

