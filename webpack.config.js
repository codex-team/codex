var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').config();
var DevelopmendMode = process.env.KOHANA_ENV === 'DEVELOPMENT';

module.exports = {

    entry: './public/app/js/main.js',

    output: {
        path: __dirname + '/public/build/',
        filename: 'bundle.js',
        library: 'codex'
    },

    module: {
        rules: [
            {
                test : /\.(png|jpg|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]'
                    },
                  }
                ]
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
                            presets: [ 'es2015' ]
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
        new ExtractTextPlugin('bundle.css'),
        new webpack.LoaderOptionsPlugin({ options: {} })
    ],

    optimization: {
        minimize: true,
        splitChunks: false
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 50
    }

};

