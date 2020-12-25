#!/usr/bin/env node

require('isomorphic-fetch');
const { parse } = require('url');
const URL = process.argv[2] || '';
const url = parse(URL);
const { spawnSync } = require('child_process');

if (!URL || !url.protocol) {
    console.log(`Please include a valid URL, got this: ${URL}`);
    process.exit(1);
}

const extensions = ['jpg', 'jpeg', 'png'];

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

