'use strict';

/**
 * CodeX Editor bundle
 */
const EditorJS = require('@editorjs/editorjs');

/**
 * Block Tools for the Editor
 */
const Header = require('@editorjs/header');
const Quote = require('@editorjs/quote');
const CodeTool = require('@editorjs/code');
const Delimiter = require('@editorjs/delimiter');
const List = require('@editorjs/list');
const LinkTool = require('@editorjs/link');
const RawTool = require('@editorjs/raw');
const ImageTool = require('@editorjs/image');
const Embed = require('@editorjs/embed');
const Table = require('@editorjs/table');

/**
 * Inline Tools for the Editor
 */
const InlineCode = require('@editorjs/inline-code');
const Marker = require('@editorjs/marker');
const Translate = require('@editorjs/translate-inline').default;

import * as _ from '../utils';


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
     * @param {boolean} settings.autofocus - focus Editor on ready
     * @param {EditorConfig} settings.editorConfigOverride - any properties to override the default Editor config
     */
    constructor(settings) {

        /**
         * CodeX Editor instance
         * @type {EditorJS|null}
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
        this.editor = new EditorJS(_.mergeDeep({
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link', 'marker', 'Translate'],
                },

                image: {
                    class: ImageTool,
                    inlineToolbar: true,
                    config: {
                        endpoints: {
                            byFile: '/editor/transport',
                            byUrl: '/editor/transport',
                        }
                    },
                },

                list: {
                    class: List,
                    inlineToolbar: true
                },

                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: '/editor/fetchUrl', // Your backend endpoint for url data fetching
                    }
                },

                code: {
                    class: CodeTool,
                    shortcut: 'CMD+SHIFT+D'
                },

                quote: {
                    class: Quote,
                    inlineToolbar: true,
                },

                delimiter: Delimiter,

                embed: Embed,

                table: {
                    class: Table,
                    inlineToolbar: true
                },

                rawTool: RawTool,

                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+C'
                },

                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M'
                },

                Translate: {
                    class: Translate,
                    config: {
                        endpoint: '/editor/translate?text=',
                    },
                    shortcut: 'CMD+SHIFT+S'
                }
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

            },

            autofocus: settings.autofocus,
        }, settings.editorConfigOverride || {}));

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

        return [
            // {
            //     type: 'header',
            //     data: {
            //         text: '',
            //         level: 2
            //     }
            // }
        ];

    }

};
