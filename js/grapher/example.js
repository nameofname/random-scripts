"use strict";

const buildGraph = require('./src/index');
const convertStocksToXY = require('./src/convertStocksToXY');
const data = require('./data/exampleData.json');

buildGraph({
    data,
    transform: convertStocksToXY,
    smoothing: { width: 100, passes: 10 },
    open: true,
});