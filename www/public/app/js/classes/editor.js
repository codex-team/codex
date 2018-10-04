'use strict';

/**
 * CodeX Editor bundle
 */
const CodexEditor = require('codex.editor');

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
     * @param settings - Editor data settings
     * @param {Object[]} settings.blocks - Editor's blocks content
     * @param {String} settings.target_click_node - Editor's node to focus on
     */
    init(settings) {

        /**
         * CodeX Editor instance
         * @type {CodexEditor|null}
         */
        this.editor = null;

        /**
         * Define content of Editor's blocks
         * @type {Object|{blocks}}
         */
        const editorData = settings.blocks || this.defaultEditorData();

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

            },

            onReady: () => {

                this.focus(settings.target_click_node);

            }
        });

    };

    /**
     * Focus on Editor after it has loaded
     * @param {String} editorNode - node of Editor to click on
     */
    focus(editorNode) {

        document.querySelector(editorNode).click();

    }

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

    }

};