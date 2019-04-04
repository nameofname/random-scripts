# /bin/bash

URL=$1
# FILENAME='tmp-total-garbage-string-its-fine-to-write-this-anywherei234yi2u3y42iu3y4ui324.txt'
# ARRAY=()

if [ -z $URL ] 
    then 
        echo 'please include a URL'
    else 
        # HOST="$(node -e "const URL = require('url'); const url = URL.parse('$URL');  console.log(url.protocol + url.host);")";

            # const fetch = require('fetch');
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

                    // second try - this is not done, its meant to be simpler, but i think a 3rd approach is brewing
                    extensions.forEach(extension => {
                        const strArr = data
                            .split('\<')
                            .filter(s => s.includes(extension))
                            .map(s => s.split(extension))
                            .reduce((total, arr) => {

                            }, [])
                    });

                    // FIRST ATTEMPT - this one is too complex
                    const strArr = data.split('\<');
                    extensions.forEach(extension => {
                        strArr.filter(s => s.includes(extension))
                        .reduce((arr, s) => {
                            s.split(extension)
                                .forEach(ss => {
                                    if (ss.includes('https') || ss.includes('http')) {
                                        const scheme = ss.includes('https') ? 'https' : 'http';
                                        arr.push(scheme + ss.split(scheme)[1]);
                                    } else {
                                        arr.push(ss + extension);
                                    }
                                    return arr;
                                });
                            return arr;
                        }, [])
                        .map(s => {
                            if (s.includes('https') || s.includes('http')) {
                                const scheme = s.includes('https') ? 'https' : 'http';
                                return scheme + s.split(scheme)[1];
                            }
                            return `$HOST${s}`;
                        })
                        .forEach(s => console.log(s));
                    });

                });
            })
        ";
        # ")";
            
                #    .map(s => url.parse(s))
                #    .map(s => url.parse(s))
                #    .forEach(s => console.log(s));
            echo $OUT;
        # " | xargs wget --adjust-extension
fi

