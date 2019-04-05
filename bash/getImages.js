#!/usr/bin/env node

require('isomorphic-fetch');
const url = require('url');
const URL = process.argv[2] || '';
const u = url.parse(URL);
if (!URL || !u.protocol) {
    console.log(`Please include a valid URL, got this: ${URL}`);
    process.exit(1);
}

const extensions = ['jpg', 'jpeg', 'png'];

fetch(URL)
    .then(d => d.text())
    .then(data => {
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
