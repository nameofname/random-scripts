# /bin/bash

URL=$1
FILENAME='tmp-total-garbage-string-its-fine-to-write-this-anywherei234yi2u3y42iu3y4ui324.txt'
# ARRAY=()

if [ -z $URL ] 
    then 
        echo 'please include a URL'
    else 
        HOST="$(node -e "const URL = require('url'); const url = URL.parse('$URL');  console.log(url.protocol + url.host);")";
        echo "Im ron, this is my host : $HOST"

        curl $URL > $FILENAME
        for EXTENSION in jpg jpeg png
        do
            cat $FILENAME | xargs -0 node -e "
            const url = require('url');
            process.argv[1]
                .split('\<')
                .filter(s => s.includes('.$EXTENSION'))
                .map(s => {
                    console.log('dealing with string', s)
                    if (s.includes('https') || s.includes('http')) {
                        const scheme = s.includes('https') ? 'https' : 'http';
                        return scheme + s.split(scheme)[1];
                    }
                    return `$HOST${s}`;
                })
                .map(s => url.parse(s))
                .map(s => url.parse(s))
                .forEach(s => console.log(s));
            "
            # " | xargs wget --adjust-extension
        done

    # rm $FILENAME;
fi

