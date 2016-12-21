"use strict";


require('./babelHook');
require('babel-polyfill');

const mockData = require('./lib/mockData');
const decisionTree = require('./lib/decisionTreeBuilder');


try {
    decisionTree(mockData);
} catch (e) {
    throw new Error(e);
}
