'use strict';

const CodexEditor = require('codex.editor');
/**
 * Require module to compose output JSON preview
 */
const cPreview = require('./cPreview');

/**
 * Load Tools for the Editor
 */
const Header = require('codex.editor.header');
const SimpleImage = require('codex.editor.simple-image');
const Quote = require('codex.editor.quote');
const Marker = require('codex.editor.marker');
const CodeTool = require('codex.editor.code');
const Delimiter = require('codex.editor.delimiter');
const InlineCode = require('codex.editor.inline-code');
const List = require('codex.editor.list');

/**
 * Editor instance
 */
let ceEditor;

/**
 * Container to output saved Editor data
 */
let output;

export default class cdxEditor {

    /**
     * Initialize Editor with settings
     * @param {Object} settings           - Editor's parameters
     * @param {String} settings.output_id - ID of container where Editor's saved data will be shown
     * @param {Object[]} settings.blocks  - Editor's blocks content
     */
    init(settings) {

        /**
         * Define content of Editor's blocks
         * @type {Object|{blocks}}
         */
        const editorData = settings.blocks || this.defaultEditorData();

        /**
         * Define сontainer to output Editor saved data
         * @type {HTMLElement}
         */
        output = document.getElementById(settings.output_id);

        if (output) {

            console.log('Output target with ID: «' + settings.output_id + '» was initialized successfully');

        } else {

            console.warn('Can\'t find output target with ID: «' + settings.output_id + '»');

        }

        /**
         * Instantiate new Editor with set of Tools
         */

        ceEditor = new CodexEditor({
            tools: {
                image: SimpleImage,

                header: {
                    class: Header,
                    inlineToolbar: ['link', 'marker', 'bold'],
                    config: {
                        placeholder: 'Title'
                    }
                },

                list: {
                    class: List,
                    inlineToolbar: true
                },

                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    config: {
                        quotePlaceholder: Quote.DEFAULT_QUOTE_PLACEHOLDER,
                        captionPlaceholder: Quote.DEFAULT_CAPTION_PLACEHOLDER
                    }
                },

                code: {
                    class: CodeTool,
                    shortcut: 'CMD+SHIFT+D'
                },

                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+C'
                },

                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M'
                },

                delimiter: Delimiter,
            },
            data: {
                blocks: editorData
            },

            onReady: () => {

                this.prepareEditor();

            },

            onChange: () => {

                this.previewData();

            }
        });

    };

    /**
     * Define default Editor's data if none was passed
     * @returns {Object[]} blocks
     */
    defaultEditorData() {

        return {
            blocks: [
                {
                    type: 'header',
                    data: {
                        text: '',
                        level: 2
                    }
                }
            ]
        };

    };

    /**
     * Shows JSON output of editor saved data
     */
    previewData() {

        ceEditor.saver.save().then((savedData) => {

            cPreview.show(savedData, output);

        });

    };

    /**
     * When editor is ready, trigger click inside editor to show toolbar
     * Preview JSON output
     */
    prepareEditor() {

        document.querySelector('.codex-editor__redactor').click();

        this.previewData();

    };

};