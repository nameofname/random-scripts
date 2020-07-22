module.exports = {
    mode: 'production',
    entry: `${__dirname}/graphData.js`,
    output: {
        filename: 'bundle.js',
        path: __dirname,
    },
    devtool: 'inline-source-map',
    // devServer: {
    //     contentBase: __dirname,
    //     compress: true,
    //     port: 9000
    // }
};
