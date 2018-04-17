let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'styles.min.css',
});

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: { presets: ['env'] }
            },
            {
                test: /(\.scss|\.css)$/,
                use: extractSass.extract({
                    use: [
                        { loader: "css-loader", options: { sourceMap: true, minimize: true }},
                        { loader: "sass-loader", options: { sourceMap: true, minimize: true }}
                    ],
                    fallback: "style-loader"
                }),
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery' ,
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
        ]
    },
    plugins: [
        extractSass,
    ],
    mode: "development",
    watch: true,
    stats: { colors: true },
    devtool: "source-map"
};