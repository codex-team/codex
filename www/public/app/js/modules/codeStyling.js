/**
 * Code Styling module
 */
module.exports = function codeStyling() {

    'use strict';

    /**
     * DOM manipulations helper
     */
    const $ = require('./dom').default;

    /**
     * Extrnal library for code styling
     * @link https://highlightjs.org
     * @type {Object}
     */
    const library = {
        js: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js',
        css : '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github-gist.min.css'
    };

    /**
     * Loads styling library
     */
    let prepare = function () {

        return Promise.all([
            $.loadResource('JS', library.js, 'highlight'),
            $.loadResource('CSS', library.css, 'highlight')
        ]).catch( err => console.warn('Cannot load code styling module: ', err))
            .then( () => console.log('Code Styling is ready') );

    };

    /**
     * Finds code blocks and fires highlighting
     * @param {String} codeBlocksSelector - where to find <code> blocks
     */
    let init = function (codeBlocksSelector) {

        let codeBlocks = document.querySelectorAll(codeBlocksSelector);

        if (codeBlocks) {

            prepare().then( () => {

                if (!window.hljs) {

                    console.warn('Code Styling script loaded but not ready');
                    return;

                }

                for (var i = codeBlocks.length - 1; i >= 0; i--) {

                    window.hljs.highlightBlock(codeBlocks[i]);

                }

            });

        }

    };

    return {
        init
    };

}();
