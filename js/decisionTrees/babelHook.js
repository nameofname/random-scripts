'use strict';

require('babel-register')({
    ignore: false,
    presets: [
        'babel-preset-node6'
    ].map(require.resolve),
    plugins: [
        'babel-plugin-transform-object-rest-spread',
        'babel-plugin-transform-async-to-generator'
    ].map(require.resolve)
});
