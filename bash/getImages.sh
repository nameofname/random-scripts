# /bin/bash

URL=$1

if [ -z $URL ] 
    then 
        echo 'please include a URL'
    else 

        # OUT="$(node -e "

        node -e "
            const url = require('url');
            const http = require('http');
            const https = require('https');
            const u = url.parse('$URL');
            const host = u.protocol + u.host;
            const fetch = u.protocol.includes('https') ? https : http;
            const extensions = ['jpg', 'jpeg', 'png'];

            fetch.get('$URL', resp => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    let matches = [];

                    extensions.forEach(extension => {
                        const re = RegExp(/((https?)?:\/\/?[^\s]+.jpg)/g);
                        const innerMatches = data
                            .match(re)
                            // dedupe based on host and path only
                            .reduce((o, match) => {
                                let u = url.parse(match);
                                u = u.protocol + '//' + u.host + u.path;
                                return Object.assign(o, { [u]: true })
                            }, {})
                        
                        matches = matches.concat(Object.keys(innerMatches));
                    });

                    matches.forEach(s => console.log(s));
                    //console.log(matches);
                });
            })
        " | xargs wget -P ./image-downloads
        # "
fi

