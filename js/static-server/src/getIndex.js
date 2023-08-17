import path from 'path';
import fs from 'fs';

function para(s) {
    return `<p><a href="/${s}">${s}</a></p>`;
}

let index;
export default function getIndex(_path) {
    if (index !== undefined) {
        return index;
    }

    const files = fs.readdirSync(_path);
    const indexTemplate = `
    <html>
        <head>
            <title>Local Static Server</title>
        </head>
        <body>
            <h1>Local Static Server Directory Listing /</h1>
            ${
                fs.readdirSync(_path).reduce((a, c) => a + para(c), '')
            }
        </body>
    </html>
    `;
    if (files.includes('index.html')) {
        index = fs.readFileSync(path.resolve(_path, 'index.html'));
    } else {
        index = indexTemplate;
    }
    return index;
}
