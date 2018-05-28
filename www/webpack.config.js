var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').config();
var DevelopmendMode = process.env.KOHANA_ENV === 'DEVELOPMENT';

module.exports = {

    entry: './public/app/js/main.js',

    output: {
        filename: './public/build/bundle.js',
        library: 'codex'
    },

    module: {
        rules: [
            {
                test : /\.(png|jpg|svg)$/,
                use : 'file-loader?name=[path][name].[ext]'
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
        new ExtractTextPlugin('public/build/bundle.css'),

        new webpack.optimize.UglifyJsPlugin({
            /** Disable warning messages. Cant disable uglify for 3rd party libs such as html-janitor */
            compress: {
                warnings: false
            }
        })
    ],

    devtool: 'source-map',

    watch: true,

    watchOptions: {
        aggragateTimeout: 50
    }

};
