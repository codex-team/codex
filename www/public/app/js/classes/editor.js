'use strict';

/**
 * CodeX Editor bundle
 */
const CodexEditor = require('codex.editor');

/**
 * Module to compose output JSON preview
 */
const cPreview = require('./cPreview');

/**
 * Tools for the Editor
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
 * Class for working with CodeX Editor
 */
export default class Editor {

    /**
     * Initialize Editor
     */
    init(settings) {

        /**
         * CodeX Editor instance
         * @type {CodexEditor|null}
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

        /**
         * Define content of Editor's blocks
         * @type {Object|{blocks}}
         */
        const editorData = settings.blocks || this.defaultEditorData();

        /**
         * Define container to output Editor saved data
         * @type {HTMLElement}
         */
        this.nodes.outputWrapper = document.getElementById(settings.output_id);

        if (this.nodes.outputWrapper) {

            console.log('Output target with ID: «' + settings.output_id + '» was initialized successfully');

        } else {

            console.warn('Can\'t find output target with ID: «' + settings.output_id + '»');

        }

        /**
         * Instantiate new CodeX Editor with set of Tools
         */
        this.editor = new CodexEditor({
            tools: {
                image: SimpleImage,
                header: {
                    class: Header,
                    inlineToolbar: ['link', 'marker'],
                },
                list: {
                    class: List,
                    inlineToolbar: true
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
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

        this.editor.saver.save().then((savedData) => {

            cPreview.show(savedData, this.nodes.outputWrapper);

        });

    };

};