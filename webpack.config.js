var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').config();
var DevelopmendMode = process.env.KOHANA_ENV === 'DEVELOPMENT';

module.exports = {

    entry: {
        main: './public/app/js/main.js'
    },

    output: {
        path: __dirname + '/public/build/',
        chunkFilename: 'bundle.js',
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
    runtimeChunk: true,
    splitChunks: {
            chunks: "async",
            minSize: 1000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 50
    }

};

