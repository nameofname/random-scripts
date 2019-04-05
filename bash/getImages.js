#!/usr/bin/env node

const url = require('url');
const http = require('http');
const https = require('https');

const URL = process.argv[2] || '';
const u = url.parse(URL);
if (!URL || !u.protocol) {
    console.log(`Please include a valid URL, got this: ${URL}`);
    process.exit(1);
}

const host = u.protocol + u.host;
const fetch = u.protocol.includes('https') ? https : http;
const extensions = ['jpg', 'jpeg', 'png'];

fetch.get(URL, resp => {
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        let matches = [];

        extensions.forEach(extension => {
            const re = RegExp(`((https?)?:\/\/?[^\\s]+.${extension})`, 'g');
            const innerMatches = data
                .match(re) || [];
                // dedupe based on host and path only
            const deduped = innerMatches.reduce((o, match) => {
                    let u = url.parse(match);
                    u = u.protocol + '//' + u.host + u.path;
                    return Object.assign(o, { [u]: true })
                }, {})
            
            matches = matches.concat(Object.keys(deduped));
        });

        matches.forEach(s => console.log(s));
    });
})
