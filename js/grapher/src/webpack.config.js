module.exports = {
    mode: 'production',
    entry: `${__dirname}/main.js`,
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
