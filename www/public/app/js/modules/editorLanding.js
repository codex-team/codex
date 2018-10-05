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
         * Bind onchange callback to preview JSON data
         */
        editorLandingSettings.onChange = () => {

            this.previewData();

        };

        /**
         * When Editor is ready, preview JSON output with initial data
         */
        editorLandingSettings.onReady = () => {

            this.previewData();

        };

        /**
         * Prepare node to output Editor data preview
         * @type {HTMLElement} - JSON preview container
         */
        this.nodes.outputWrapper = document.getElementById(editorLandingSettings.output_id);

        if (!this.nodes.outputWrapper) {

            console.warn('Can\'t find output target with ID: «' + editorLandingSettings.output_id + '»');

        }

        /**
         * Settings for Editor class
         * @type {{blocks: Object[], onChange: {function}, onReady: {function}}}
         */
        let editorSettings = {
            blocks: editorLandingSettings.blocks,
            onChange: editorLandingSettings.onChange,
            onReady: editorLandingSettings.onReady
        };

        this.loadEditor(editorSettings).then((editor) => {

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