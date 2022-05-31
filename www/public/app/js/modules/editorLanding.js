'use strict';

/**
 * Module to compose output JSON preview
 */
const cPreview = require('../classes/cPreview');

/**
 * Module for pages using Editor
 */
export default class EditorLanding {

    constructor() {

        /**
         * Editor class Instance
         */
        this.editor = null;

        /**
         * DOM elements
         */
        this.nodes = {
            /**
            * Container to output saved Editor data
            */
            outputWrapper: null
        };

    }

    /**
     * @typedef {Object} editorLandingSettings - Editor landing class settings
     * @property {String} editorLandingSettings.output_id - ID of container where Editor's saved data will be shown
     * @property {function} editorLandingSettings.onChange - Modifications callback for the Editor
     */

    /**
     * Initialization. Called by Module Dispatcher
     */
    init(editorLandingSettings) {

        /**
         * Prepare node to output Editor data preview
         * @type {HTMLElement} - JSON preview container
         */
        this.nodes.outputWrapper = document.getElementById(editorLandingSettings.output_id);

        if (!this.nodes.outputWrapper) {

            console.warn('Can\'t find output target with ID: «' + editorLandingSettings.output_id + '»');

        }

        const dataSample = [
            {
                type: 'header',
                data: {
                    text: 'Editor.js',
                    level: 2
                }
            },
            {
                type : 'paragraph',
                data : {
                    text : 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
                }
            },
            {
                type: 'header',
                data: {
                    text: 'Key features',
                    level: 3
                }
            },
            {
                type : 'list',
                data : {
                    items : [
                        'It is a block-styled editor',
                        'It returns clean data output in JSON',
                        'Designed to be extendable and pluggable with a simple API',
                    ],
                    style: 'unordered'
                }
            },
            {
                type: 'header',
                data: {
                    text: 'What does it mean «block-styled editor»',
                    level: 3
                }
            },
            {
                type : 'paragraph',
                data : {
                    text : 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
                }
            },
            {
                type : 'paragraph',
                data : {
                    text : 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
                }
            },
            {
                type: 'header',
                data: {
                    text: 'What does it mean clean data output',
                    level: 3
                }
            },
            {
                type : 'paragraph',
                data : {
                    text : 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
                }
            },
            {
                type : 'paragraph',
                data : {
                    text : 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
                }
            },
            {
                type : 'paragraph',
                data : {
                    text : 'Clean data is useful to sanitize, validate and process on the backend.'
                }
            },
            {
                type : 'delimiter',
                data : {}
            },
            {
                type : 'paragraph',
                data : {
                    text : 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it\'s core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏'
                }
            },
            {
                type: 'image',
                data: {
                    file: {
                        url: 'https://codex.so/public/app/img/external/codex2x.png',
                    },
                    caption: '',
                    stretched: false,
                    withBorder: false,
                    withBackground: false,
                }
            },
        ];

        this.loadEditor({
            blocks: dataSample,
            // blocks: editorLandingSettings.blocks,
            /**
             * Need to focus editor
             */
            autofocus: false,
            /**
             * Bind onchange callback to preview JSON data
             */
            onChange: () => {

                this.previewData();

            },
            /**
             * When Editor is ready, preview JSON output with initial data
             */
            onReady: () => {

                this.previewData();
                // this.editor.focus();

            },
            /**
             * Override some default Editor config properties
             */
            editorConfigOverride: {
                tools: {
                    image: {
                        config: {
                            /**
                             * Custom uploader
                             */
                            uploader: {
                                /**
                                 * Fake "Upload file to the server" and return an uploaded image url
                                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                                 * @return {Promise.<{success, file: {url}}>}
                                 */
                                uploadByFile(file) {

                                    return new Promise((resolve, reject) => {

                                        const reader = new FileReader();

                                        reader.addEventListener('load', function () {

                                            setTimeout(() => {

                                                resolve({
                                                    success: 1,
                                                    file: {
                                                        url: reader.result
                                                    }
                                                });

                                            }, 1000);

                                        }, false);

                                        reader.readAsDataURL(file);

                                    });

                                },

                                /**
                                 * Fake "Send URL-string to the server" and return an uploaded image url
                                 * @param {string} url - pasted image URL
                                 * @return {Promise.<{success, file: {url}}>}
                                 */
                                uploadByUrl(url) {

                                    return new Promise((resolve, reject) => {

                                        setTimeout(() => {

                                            resolve({
                                                success: 1,
                                                file: {
                                                    url: url
                                                }
                                            });

                                        }, 1000);

                                    });

                                }
                            }
                        }
                    }
                }
            }
        }).then((editor) => {

            this.editor = editor;

        });

    };

    /**
     * Load Editor from separate chunk
     * @param settings - settings for Editor initialization
     * @return {Promise<Editor>} - CodeX Editor promise
     */
    loadEditor(settings) {

        return import(/* webpackChunkName: "editor" */ 'classes/editor')
            .then(({default: Editor}) => {

                return new Editor(settings);

            });

    }

    /**
     * Shows JSON output of editor saved data
     */
    previewData() {

        this.editor.save().then((savedData) => {

            cPreview.show(savedData, this.nodes.outputWrapper);

        });

    };

};
