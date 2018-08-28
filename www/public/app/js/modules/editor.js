'use strict';

const CodexEditor = require('codex.editor');

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

let ceEditor;

class Editor {

    init(settings) {

        const editorData = settings.blocks || this.defaultEditorData;

        ceEditor = new CodexEditor({
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
            }
        });

    }

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

    saveData() {

        ceEditor.saver.save()
            .then((savedData) => {

                return savedData;

            });

    }

};

module.exports = new Editor();