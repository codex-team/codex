'use strict';

const CodexEditor = require('codex.editor');

/**
 * JSON preview for Editor's demo
 */
const cPreview = require('./json-preview');

/**
 * Editor's demo save button
 * @type {HTMLElement}
 */
let saveButton = document.getElementById('saveButton');

/**
 * Editor's preview data output
 * @type {HTMLElement}
 */
let editorOutput = document.getElementById('output');

/**
 * CodeX Editor instance
 */
let editor;

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
 * Initialize CodeX Editor
 */
class InitEditor {

    constructor() {

        editor = null;

        this.saveData();

    }

    saveData() {

        /**
         * Saving example
         */
        if (saveButton && editorOutput) {

            saveButton.addEventListener('click', function () {

                editor.saver.save()
                    .then((savedData) => {

                        cPreview.show(savedData, editorOutput);

                    });

            });

        }

    }

    runEditor(data = {}) {

        const editorData = data || this.defaultEditorData;

        editor = new CodexEditor({
            holderId: 'codex-editor',
            tools: {
                image: SimpleImage,

                header: {
                    class: Header,
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
                        quotePlaceholder: 'Enter a quote',
                        captionPlaceholder: 'Quote\'s author'
                    }
                },

                code: {
                    class:  CodeTool,
                    shortcut: 'CMD+SHIFT+D'
                },

                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+C'
                },

                marker: {
                    class:  Marker,
                    shortcut: 'CMD+SHIFT+M'
                },

                delimiter: Delimiter,
            },

            data: editorData,

            onReady: function () {

                InitEditor.onReady;
                if (saveButton) {

                    saveButton.click();

                }

            }
        });

    }

    get defaultEditorData() {

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

}

module.exports = new InitEditor();