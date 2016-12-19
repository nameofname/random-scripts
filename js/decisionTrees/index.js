"use strict";


require('./babelHook');
require('babel-polyfill');

const decisionTree = require('./lib/decisionTree');

decisionTree();
