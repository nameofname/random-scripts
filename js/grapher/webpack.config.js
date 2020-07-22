module.exports = {
    mode: 'production',
    entry: `${__dirname}/index.js`,
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
