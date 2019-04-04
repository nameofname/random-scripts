# /bin/bash

URL=$1
FILENAME='tmp-total-garbage-string-its-fine-to-write-this-anywherei234yi2u3y42iu3y4ui324.txt'
ARRAY=()

if [ -z $URL ] 
    then 
        echo 'please include a URL'
    else 
        curl $URL > $FILENAME
        for EXTENSION in jpg jpeg png
        do
            cat $FILENAME | xargs -0 node -e "
            const url = require('url');
            process.argv[1]
                .split('\n')
                .filter(s => s.includes('.$EXTENSION'))
                .map(s => {
                    if (s.includes('https') || s.includes('http')) {
                        const scheme = s.includes('https') ? 'https' : 'http';
                        return scheme + s.split(scheme)[1];
                    }
                })
                .map(s => url.parse(s).href)
                .forEach(s => console.log(s));
            " | wget
                
                #| grep $EXTENSION | xargs echo "ner ner ner $1"
                #                 .forEach(s => console.log('ron ron ron ', s))"
        done

    rm $FILENAME;
fi

