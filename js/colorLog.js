"use strict";

/**
 * Enhanced console logger, supports all colors from colors module. Includes colors list method.
 * USAGE :
 *      var log = require('./lib/log');
 *      log.red('ERROR : this is an error');
 *      log.green('SUCCESS : this is a success message');
 * @type {exports}
 */
var colors = require('colors');
var color = 'yellow';

var _loggo = function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (arg, idx) {
        args[idx] = colors[color](args[idx]);
    });
    console.log.apply(console.log, args);
};

var loggo = function () {
    color = 'yellow';
    return _loggo.apply(this, arguments);
};

var _makeColorMethod = function (c) {
    return function () {
        color = c;
        return _loggo.apply(this, arguments);
    }
};

for (var key in colors.styles) {
    loggo[key] = _makeColorMethod(key);
}

loggo.listColors = function () {
    var arr = [];
    for (var key in colors.styles) {
        arr.push(key);
    }
    return arr;
};

module.exports = loggo;
