const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HawkWebpackPlugin = require('@hawk.so/webpack-plugin');
const path = require('path');

require('dotenv').config();

module.exports = {

    entry: {
        codex: './public/app/js/main.js',
        HawkCatcher: './public/app/js/modules/hawk.js',
        reactions: './public/app/js/modules/reactions.js',
        landingLab: './public/app/landings/lab/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        publicPath: '/public/build/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js?h=[hash]',
        library: '[name]'
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
                test: /\.(css|pcss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    /** Babel loader */
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: '.cache/babel-loader',
                            presets: [
                                '@babel/preset-env',
                            ],
                            plugins: [
                                'babel-plugin-transform-es2015-modules-commonjs',
                                '@babel/plugin-syntax-dynamic-import'
                            ]
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            filename: '[name].bundle.css'
        }),

        // new HawkWebpackPlugin({
        //     integrationToken: process.env.HAWK_TOKEN
        // })
    ],

    resolve: {
        alias: {
            classes: path.resolve(__dirname, 'public/app/js/classes'),
        },
    },

    /**
     * Optimization params
     */
    optimization: {
        noEmitOnErrors: true,
        splitChunks: false
    },

    devtool: 'hidden-source-map',
};
