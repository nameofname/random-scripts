"use strict";


require('./babelHook');
require('babel-polyfill');

const mockData = require('./lib/mockData');
const decisionTree = require('./lib/decisionTreeBuilder');


decisionTree(mockData);
