const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './public/app/js/main.js',

    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        filename: 'bundle.js',
        library: 'codex'
    },

    module: {
        rules: [
            {
                test : /\.(png|jpg|svg)$/,
                use : [{
                    loader: 'file-loader?name=[path][name].[ext]',
                    options: {
                        emitFile: false
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: 1,
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ])
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    /** Babel loader */
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [ 'env' ]
                        }
                    },
                    /** ES lint For webpack build */
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true
                        }
                    }
                ]
            }
        ]},

    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],

    /**
     * Rebuild bundles on files changes
     * Param --watch is a key for the command in the package.json scripts
     */
    watchOptions: {
        aggregateTimeout: 50,
    },

    /**
     * Optimization params
     */
    optimization: {
        noEmitOnErrors: true,
        splitChunks: false,
        minimize: true
    },

    devtool: 'source-map'
};