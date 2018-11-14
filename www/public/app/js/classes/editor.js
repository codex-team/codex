'use strict';

/**
 * CodeX Editor bundle
 */
const CodexEditor = require('codex.editor');

/**
 * Tools for the Editor
 */
const Header = require('codex.editor.header');
const Quote = require('codex.editor.quote');
const Marker = require('codex.editor.marker');
const CodeTool = require('codex.editor.code');
const Delimiter = require('codex.editor.delimiter');
const InlineCode = require('codex.editor.inline-code');
const List = require('codex.editor.list');
const RawTool = require('codex.editor.raw');
const ImageTool = require('codex.editor.image');

/**
 * Class for working with CodeX Editor
 */
export default class Editor {

    /**
     * Initialize Editor
     * @param settings - Editor data settings
     * @param {Object[]} settings.blocks - Editor's blocks content
     * @param {function} settings.onChange - Modifications callback for the Editor
     * @param {function} settings.onReady - Editor is ready callback
     */
    constructor(settings) {

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
                header: {
                    class: Header,
                    inlineToolbar: ['link', 'marker'],
                },
                image: {
                    class: ImageTool,
                    inlineToolbar: true,
                    config: {
                        url: '/editor/transport',
                    }
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
                rawTool: {
                    class: RawTool,
                    shortcut: 'CMD+SHIFT+R'
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

                if (settings.onChange instanceof Function) {

                    settings.onChange();

                }

            },

            onReady: () => {

                if (settings.onReady instanceof Function) {

                    settings.onReady();

                }

                this.focus();

            }
        });

    }

    /**
     * Return Editor data
     * @return {Promise.<{}>}
     */
    save() {

        return this.editor.saver.save();

    }

    /**
     * Click on Editor's node to focus after Editor has loaded
     */
    focus() {

        document.querySelector('.codex-editor__redactor').click();

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
