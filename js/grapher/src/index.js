"use strict";

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const webpackConfig = require('./webpack.config');
const weightedAverageSmoothing = require('./weightedAverageSmoothing');


module.exports = function buildGraph({ data, open = false, smoothing = {}, transform }) {

    console.log('__dirname', __dirname);
    function transformer(data) {
        data = transform(data);
        const { width, passes } = smoothing;
        if (width) {
            return weightedAverageSmoothing(data, width, passes);
        }
        return data;
    }

    // Write the data to file. 
    data = transformer(data);
    fs.writeFileSync(`${__dirname}/__data.json`, JSON.stringify(data, null, 2), { encoding: 'utf-8' });

    // Invoke Webpack with 
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            throw err;
        } else {
            // Open completed graph in browser
            const location = `file:///${path.resolve(__dirname, '../graph.html')}`;
            console.log(`Your complete graph is located at ${location}`);
            if (open) {
                opn(location);
            }
        }
    });
}
