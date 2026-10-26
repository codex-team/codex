import path from 'node:path';
import dotenv from 'dotenv';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HawkWebpackPlugin from '@hawk.so/webpack-plugin';

dotenv.config({ quiet: true });

export default {

    entry: {
        codex: './public/app/js/main.js',
        HawkCatcher: './public/app/js/modules/hawk.js',
        reactions: './public/app/js/modules/reactions.js',
        landingLab: './public/app/landings/lab/index.js'
    },

    output: {
        path: path.resolve(import.meta.dirname, 'public', 'build'),
        publicPath: '/public/build/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js?h=[contenthash]',

        /**
         * Expose default export of each entry as a global variable with the entry name:
         * window.codex, window.HawkCatcher, window.reactions
         */
        library: {
            name: '[name]',
            type: 'var',
            export: 'default'
        }
    },

    module: {
        rules: [
            {
                /**
                 * Images are served from their original location, so keep the path and don't copy them to the build
                 */
                test : /\.(png|jpg|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name][ext]',
                    publicPath: '/',
                    emit: false
                }
            },
            {
                test: /\.(css|pcss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            /** Leave root-relative urls like url(/public/app/img/...) as is */
                            url: {
                                filter: url => !url.startsWith('/')
                            }
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    /** Babel loader */
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: '.cache/babel-loader',
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            filename: '[name].bundle.css'
        }),

        /** ES lint For webpack build */
        new ESLintPlugin({
            fix: true
        }),

        new HawkWebpackPlugin({
            integrationToken: process.env.HAWK_TOKEN
        })
    ],

    resolve: {
        alias: {
            classes: path.resolve(import.meta.dirname, 'public/app/js/classes')
        }
    },

    /**
     * Optimization params
     */
    optimization: {
        emitOnErrors: false,
        splitChunks: false,
        minimizer: [
            /** Keep license comments inside bundles instead of separate *.LICENSE.txt files */
            new TerserPlugin({
                extractComments: false
            })
        ]
    },

    devtool: 'hidden-source-map'
};
