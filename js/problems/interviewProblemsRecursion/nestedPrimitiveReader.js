const itemJson = require('../../data/f_123.json');

function nestedPrimitives(json) {
    const strings = [];

    function _check(entity) {
        if (typeof entity === 'string') {
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

console.log('here is a flat array of all strings in the item json', nestedPrimitives(itemJson));