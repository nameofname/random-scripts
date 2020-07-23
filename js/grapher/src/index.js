"use strict";

const webpack = require('webpack');
const fs = require('fs');
const webpackConfig = require('./webpack.config');
const weightedAverageSmoothing = require('./weightedAverageSmoothing');


module.exports = function buildGraph({ data, smoothing= {}, transform }) {

    console.log('__dirname', __dirname);
    function transformer(data) {
        data = transform(data);
        const { width, passes } = smoothing;
        if (width) {
            return weightedAverageSmoothing(data, width, passes);
        }
        return data;
    }

    // TODO ! Write the data to file. 
    data = transformer(data);
    fs.writeFileSync(`${__dirname}/__data.json`, data, { encoding: 'utf-8' });

    // TODO ! Invoke Webpack with 
    // TODO ! Open Chrome with the completed graph

}
