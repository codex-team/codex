'use strict';

/**
 * Module to compose output JSON preview
 */
const cPreview = require('../classes/cPreview');

/**
 * Module for pages using Editor
 */
export default class Writing {

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
     * @typedef {Object} writingSettings - Writing class settings for the Editor
     * @property {String} writingSettings.output_id - ID of container where Editor's saved data will be shown
     * @property {function} writingSettings.onChange - Modifications callback for the Editor
     */

    /**
     * Initialization. Called by Module Dispatcher
     */
    init(writingSettings) {

        /**
         * Bind onchange callback to preview JSON data
         */
        writingSettings.onChange = () => {

            this.previewData();

        };

        this.loadEditor(writingSettings).then((editor) => {

            this.editor = editor;

            this.preparePreview(writingSettings.output_id);

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
     * When Editor is ready, preview JSON output with initial data
     * @param outputId - container for Editor data output
     */
    preparePreview(outputId) {

        this.editor.editor.isReady
            .then(() => {

                /**
                 * Define container to output Editor saved data
                 * @type {HTMLElement}
                 */
                this.nodes.outputWrapper = document.getElementById(outputId);

                if (!this.nodes.outputWrapper) {

                    console.warn('Can\'t find output target with ID: «' + outputId + '»');

                } else {

                    this.previewData();

                }

            })
            .catch((reason) => {

                console.log(`CodeX Editor initialization failed because of ${reason}`);

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