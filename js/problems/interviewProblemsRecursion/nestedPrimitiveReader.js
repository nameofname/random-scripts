const itemJson = require('../../data/f_123.json');

function nestedPrimitives(json, type) {
    const strings = [];

    function _check(entity) {
        if (typeof entity === type) {
            strings.push(entity);
        } else {
            _seek(entity);
        }
    }

    function _seek(json) {
        if (Array.isArray(json)) {
            json.forEach(_check);
        } else if (typeof json === 'object') {
            Object.keys(json).forEach(key => _check(json[key]));
        }
    }

    _seek(json);

    return strings;
}

// Pretty print a list of nested keys with tab indentation
function nestedKeys(json) {
    const indentUnit = '    ';
    const output = [];

    function _crawl(json, indent) {
        if (Array.isArray(json)) {
            output.push(`\n${indent}[`);
            json.forEach(thing => _crawl(thing, indent + indentUnit));
            output.push(`\n${indent}]`);
        } else if (typeof json === 'object') {
            Object.keys(json).forEach(key => {
                output.push(`\n${indent}${key}`);
                _crawl(json[key], indent + indentUnit);
            });
        }
    }

    _crawl(json, indentUnit);
    return output.join('');
}


// console.log('here is a flat array of all strings in the item json', nestedPrimitives(itemJson, 'string'));
console.log('here is a string representing the nested keys of the json', nestedKeys(itemJson, 'string'));