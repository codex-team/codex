const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const webpack = require('webpack');
const path = require('path');

/**
 * Main site config
 */
const mainConfig = {

    entry: './public/app/js/main.js',

    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        filename: 'main.bundle.js',
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
     * Optimization params
     */
    optimization: {
        noEmitOnErrors: true,
        splitChunks: false,
        minimize: true
    },

    devtool: 'source-map'
};

/**
 * Separate bundle for CodeX Editor with plugins
 */
const editorConfig = {
    entry: './public/app/js/editors-demo.js',

    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        filename: 'editor.bundle.js'
    },
    module: {
        rules: [
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
};

module.exports = [mainConfig, editorConfig];