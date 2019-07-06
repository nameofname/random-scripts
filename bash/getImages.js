#!/usr/bin/env node

require('isomorphic-fetch');
const { parse } = require('url');
const URL = process.argv[2] || '';
const url = parse(URL);
if (!URL || !url.protocol) {
    console.log(`Please include a valid URL, got this: ${URL}`);
    process.exit(1);
}

const extensions = ['jpg', 'jpeg', 'png'];

fetch(URL)
    .then(d => d.text())
    .then(data => {
        let matches = [];

        extensions.forEach(extension => {
            // const re = RegExp(`((https?)?:\/\/?[^\\s]+.${extension})`, 'g');
            const re = RegExp(`(((https?)?:\/\/?)?[^\\s"']+.${extension})`, 'g');
            const innerMatches = data
                .match(re) || [];
                // dedupe based on host and path only
            const deduped = innerMatches.reduce((o, match) => {
                    const url1 = parse(match);
                    const useUrl = url1.host ? url1 : url;
                    const path = url1.path.indexOf('/') === 0 ? url1.path : `/${url1.path}`;
                    const location = `${useUrl.protocol}//${useUrl.host}${path}`;
                    return Object.assign(o, { [location]: true })
                }, {})
            
            matches = matches.concat(Object.keys(deduped));
        });

        matches.forEach(s => console.log(s));
    });
